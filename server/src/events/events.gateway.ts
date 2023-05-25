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
import { BingoBoard, RESULT } from './dto/events.bingoBoard';
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
    public gameData: Map<string, BingoBoard> = new Map();

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
      
      this.gameData.set(client.id, bingoBoard);

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
      bingoBoard.turn = true;
      let res = { room, bingoBoard };
      const player1 = this.getId(room.player1);
      this.gameData.set(player1, bingoBoard);
      this.server.to(player1).emit('created', res);

      //player2 데이터 생성 및 전송
      bingoBoard = this.eventsService.createBoard();
      res = { room, bingoBoard };
      const player2 = this.getId(room.player2);
      this.gameData.set(player2, bingoBoard);
      this.server.to(player2).emit('created', res);

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
      this.gameData.delete(this.users.get(client.id));
      client.leave(roomName);
      client.join('lobby');
      client.to('lobby').emit('roomList', this.roomList());
      client.emit('roomList', this.roomList());
    }

    //빙고 게임 결과 확인
    @SubscribeMessage('check')
    check(@MessageBody() data: BingoBoard, @ConnectedSocket() client: Socket) {
      let roomName;
      console.log("입력data");
      console.log(data.cell);

      //결과 확인
      const userData:BingoBoard = this.eventsService.checklogic(data);
      
      for (const key of client.rooms.keys()) {
      roomName = key;
      }
      const room: Room = this.rooms.get(roomName);

      //승패 확인
      this.resultCheck(userData, room, client.id);

      //턴 오버 및 데이터 동기화
      this.turnOver(userData, room, client.id);

      //게임 재경기
      if(this.gameData.get(this.getId(room.player1)).restart && this.gameData.get(this.getId(room.player2)).restart){
        this.restart(room);
      }
    
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

    //Socket ID 가져오기
    getId(player:string):string {
      const searchValue = player;
      let foundId = '';
      let foundEntry = Array.from(this.users.entries()).find(([, value]) => value === searchValue);
      if (foundEntry) {
        const [key] = foundEntry;
        foundId = key;
      }
      return foundId;
    }

    //결과 확인
    resultCheck(userData:BingoBoard, room:Room, clientId:string) {
      let bingoBoard:BingoBoard = userData;
      //player1 승리
      if(bingoBoard.result == "WIN" && room.player1 == this.users.get(clientId)){
        const player1Data = { room, bingoBoard };
        this.server.to(this.getId(room.player1)).emit('created', player1Data);
        
        bingoBoard = this.gameData.get(this.getId(room.player2))
        bingoBoard.result = RESULT.LOSE;
        const player2Data = { room, bingoBoard };
        this.server.to(this.getId(room.player2)).emit('created', player2Data);
      }

      //player2 승리
      if(bingoBoard.result == "WIN" && room.player2 == this.users.get(clientId)){
        const player2Data = { room, bingoBoard };
        this.server.to(this.getId(room.player2)).emit('created', player2Data);
        
        bingoBoard = this.gameData.get(this.getId(room.player1))
        bingoBoard.result = RESULT.LOSE;
        const player1Data = { room, bingoBoard };
        this.server.to(this.getId(room.player1)).emit('created', player1Data);
      }
    }

    //턴 오버 및 데이터 동기화
    turnOver(userData:BingoBoard, room:Room, clientId:string) {
      //player1 턴오버, player2 isSelected 동기화
      if(room.player1 == this.users.get(clientId)){
        console.log("player1 턴오버 확인");
        let selectedNumber:number[] = [];
        this.gameData.set(clientId, userData);
        
        for(let i=0;i<5;i++){
          for(let j=0;j<5;j++){
            if(userData.cell[i][j]?.isSelected){
              selectedNumber.push(userData.cell[i][j].number);
            }
          }
        }
        let bingoBoard:BingoBoard = this.gameData.get(this.getId(room.player1));
        bingoBoard.turn = false;
        
        const player1Data = { room, bingoBoard };

        this.server.to(this.getId(room.player1)).emit('created', player1Data)

        bingoBoard = this.gameData.get(this.getId(room.player2));

        selectedNumber.forEach((n)=>{
          for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
              if(bingoBoard.cell[i][j]?.number == n){
                bingoBoard.cell[i][j].isSelected = true;
              }
            }
          }
        });

        bingoBoard.turn = true;
        console.log(bingoBoard.cell);
        console.log(bingoBoard.turn);

        const player2Data = { room, bingoBoard };

        this.server.to(this.getId(room.player2)).emit('created', player2Data);
        
      }

      //player2 턴오버, player1 isSelected 동기화
      if(room.player2 == this.users.get(clientId)){
        console.log("player2 턴오버 확인");
        let selectedNumber:number[] = [];
        this.gameData.set(clientId, userData);
        
        for(let i=0;i<5;i++){
          for(let j=0;j<5;j++){
            if(userData.cell[i][j]?.isSelected){
              selectedNumber.push(userData.cell[i][j].number);
            }
          }
        }
        let bingoBoard:BingoBoard = this.gameData.get(this.getId(room.player2));
        bingoBoard.turn = false;
        
        const player2Data = { room, bingoBoard };

        this.server.to(this.getId(room.player2)).emit('created', player2Data)

        bingoBoard = this.gameData.get(this.getId(room.player1));
        
        selectedNumber.forEach((n)=>{
          for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
              if(bingoBoard.cell[i][j]?.number == n){
                bingoBoard.cell[i][j].isSelected = true;
              }
            }
          }
        });

        bingoBoard.turn = true;
        console.log(bingoBoard.cell);
        console.log(bingoBoard.turn);

        const player1Data = { room, bingoBoard };

        this.server.to(this.getId(room.player1)).emit('created', player1Data);
      }
    }

    //게임 재경기
    restart(room:Room) {
        //player1 리셋
        let bingoBoard:BingoBoard = this.eventsService.createBoard();
        this.gameData.set(this.getId(room.player1), bingoBoard);
        const player1Data = { room, bingoBoard };
        this.server.to(this.getId(room.player1)).emit('created', player1Data);

        //player2 리셋
        bingoBoard = this.eventsService.createBoard();
        this.gameData.set(this.getId(room.player2), bingoBoard);
        const player2Data = { room, bingoBoard };
        this.server.to(this.getId(room.player2)).emit('created', player2Data);
    }
  }