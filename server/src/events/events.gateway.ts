import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { Room } from './dto/events.room.dto';
import { BingoBoard } from './dto/events.bingoBoard';
import { EventsService } from './events.service';
import { Message } from './dto/events.message';


  @WebSocketGateway(4005, {
    cors: {
      origin: '*',
    },
  })
  
  export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    constructor(private readonly eventsService: EventsService){}

    @WebSocketServer()
    server: Server;
    
    public users: Map<string, string> = new Map();
    public rooms: Map<string, Room> = new Map();

    //웹소켓 연결 시 로비 입장
    handleConnection(client: Socket) {
      client.rooms.clear();
      client.join('lobby');
      client.emit('roomList', this.roomList());
      console.log(client.id+" connected!");
            
    }

    //웹소켓 연결해제 시 유저 정보 삭제
    handleDisconnect(client: Socket) {
      console.log(this.users.get(client.id)+" disconnected!");
      this.users.delete(client.id);
    }

    //접속 시 입력한 ID 받아서 저장
    @SubscribeMessage('information')
    information(@MessageBody() name: string , @ConnectedSocket() client: Socket) {
      this.users.set(client.id, name);
    }
    
    //클라이언트에서 보낸 메세지 처리
    @SubscribeMessage('newMessage')
    message(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      let room:string ='';
      const user:string = this.users.get(client.id);
      const message: Message = new Message();
      message.name = user;
      message.text = data;
      for (const key of client.rooms.keys()) {
        room = key;
      }
      this.server.to(room).emit('onMessage', message);
    }

    //방 생성 처리
    @SubscribeMessage('create')
    create(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      const room: Room = new Room();

      room.title = data;
      room.player1 = this.users.get(client.id);
      client.leave('lobby');
      this.rooms.set(room.number, room);
      client.join(room.number);
            
      const bingoBoard: BingoBoard = this.eventsService.createBoard();
      bingoBoard.turn = true;
      const res = { room, bingoBoard };

      this.server.to(client.id).emit('created', res)
      client.to('lobby').emit('roomList', this.roomList());
      client.emit('roomList', this.roomList());
    }

    //생성된 방에 조인 처리
    @SubscribeMessage('join')
    join(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      const room:Room = this.rooms.get(data);

      if(room.player1==''){
        room.player1 = this.users.get(client.id);
      } else {
        room.player2 = this.users.get(client.id);
      }
      this.rooms.set(room.number,room);
      client.leave('lobby');
      client.join(data);

      //player1 데이터 생성 및 전송
      let bingoBoard: BingoBoard = this.eventsService.createBoard();
      let res = { room, bingoBoard };
      this.server.to(room.player1).emit('created', res);

      //player2 데이터 생성 및 전송
      bingoBoard = this.eventsService.createBoard();
      res = { room, bingoBoard };
      this.server.to(room.player2).emit('created', res);

      client.to('lobby').emit('roomList', this.roomList());
      client.emit('roomList', this.roomList());
    }

    //방에서 나가기 처리
    @SubscribeMessage('leave')
    leave(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      let roomName;

      for (const key of client.rooms.keys()) {
        roomName = key;
      }
      const room: Room = this.rooms.get(roomName);
      
      if(room.player1==this.users.get(client.id) && !(room.player2=='')){
        room.player1 = '';
      } else if (room.player2==this.users.get(client.id) && !(room.player1=='')){
        room.player2 = '';
      } else {
        this.rooms.delete(room.number);
      }
      client.leave(roomName);
      client.join('lobby');
      client.to('lobby').emit('roomList', this.roomList());
      client.emit('roomList', this.roomList());
    }

    //빙고 게임 결과 확인
    @SubscribeMessage('check')
    check(@MessageBody() data: BingoBoard, @ConnectedSocket() client: Socket) {
      let roomName;

      const userData:BingoBoard = this.eventsService.checklogic(data);

      for (const key of client.rooms.keys()) {
        roomName = key;
      }
      const room: Room = this.rooms.get(roomName);

      //player1 승리
      if(userData.result == "WIN" && room.player1 == this.users.get(client.id)){
        this.server.to(room.player1).emit('result', 'WIN');
        this.server.to(room.player2).emit('result', 'LOSE');
      }

      //player2 승리
      if(userData.result == "WIN" && room.player2 == this.users.get(client.id)){
        this.server.to(room.player2).emit('result', 'WIN');
        this.server.to(room.player1).emit('result', 'LOSE');
      }
      
      return userData;
    }

    //bingoboard 생성 테스트
    @SubscribeMessage('createBingo')
    createBingo(@ConnectedSocket() client: Socket) {
      const bingoBoard:BingoBoard = this.eventsService.createBoard();
    }

    //방 리스트 가져오기
    roomList():Room[] {
      const roomList: Room[] = Array.from(this.rooms.keys(), (key: string) => this.rooms.get(key)!);
      return roomList;
    }
  }