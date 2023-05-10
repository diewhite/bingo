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
import { ShortId } from 'shortid';


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
    handleConnection(Client: Socket) {
      Client.rooms.clear();
      Client.join('lobby');
      console.log(Client.id+" connected!");
            
    }

    //웹소켓 연결해제 시 유저 정보 삭제
    handleDisconnect(Client: Socket) {
      console.log(this.users.get(Client.id)+" disconnected!");
      this.users.delete(Client.id);
    }

    //접속 시 입력한 ID 받아서 저장
    @SubscribeMessage('information')
    information(@MessageBody() name: string , @ConnectedSocket() client: Socket) {
      this.users.set(client.id, name);
      console.log("client id : "+client.id);
      console.log("client name : "+name);
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
      console.log(message.name+" : "+message.text);      
      console.log("room : "+room);
    }

    //방 생성 처리
    @SubscribeMessage('create')
    create(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      const room: Room = new Room();

      room.title = data;
      room.player1 = this.users.get(client.id);
      client.leave('lobby');
      this.rooms.set(room.number, room);
      console.log(room);
      client.join(room.number);
            
      const bingoBoard: BingoBoard = this.eventsService.createBoard();
      const res = { room, bingoBoard };

      this.server.to(client.id).emit('created', res)
    }

    //생성된 방에 조인 처리
    @SubscribeMessage('join')
    join(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      const room:Room = this.rooms.get(data);

      if(!room.player1){
        room.player1 = this.users.get(client.id);
      } else {
        room.player2 = this.users.get(client.id);
      }

      this.rooms.set(room.number,room);
      client.join(data);
      this.server.to(client.id).emit('joined', room);
    }

    //방에서 나가기 처리
    @SubscribeMessage('leave')
    leave(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      const room: Room = this.rooms.get(data);
      
      if(room.player1==this.users.get(client.id)){
        room.player1 = '';
      } else if (room.player2==this.users.get(client.id)){
        room.player2 = '';
      } else {
        this.rooms.delete(room.number);
      }
      
      client.rooms.clear();
      client.join('lobby');
    }

    // @SubscribeMessage('check')
    // check(@ConnectedSocket() client: Socket) {
    //   console.log(this.users.get(client.id));
    //   console.log(this.rooms.length);
    //   console.log("client room size : "+client.rooms.size);
    //   for (const key of client.rooms.keys()) {
    //     console.log(key);
    //   }
    // }

    @SubscribeMessage('check')
    check(@MessageBody() data: BingoBoard, @ConnectedSocket() client: Socket): BingoBoard {
      const userData:BingoBoard = data;
      return this.eventsService.checklogic(userData);
    }

    //bingoboard 생성 테스트
    @SubscribeMessage('createBingo')
    createBingo(@ConnectedSocket() client: Socket) {
      const bingoBoard:BingoBoard = this.eventsService.createBoard();
      console.log(bingoBoard);
    }
  }