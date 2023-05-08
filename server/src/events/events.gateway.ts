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
    public rooms: Room[] = [];

    handleConnection(Client: Socket) {
      Client.rooms.clear();
      Client.join('lobby');
      console.log(Client.id+" connected!");
            
    }
    handleDisconnect(Client: Socket) {
      console.log(this.users.get(Client.id)+" disconnected!");
      this.users.delete(Client.id);
    }
    @SubscribeMessage('information')
    information(@MessageBody() name: string , @ConnectedSocket() client: Socket) {
      this.users.set(client.id, name);
      console.log("client id : "+client.id);
      console.log("client name : "+name);
    }
    
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

    @SubscribeMessage('join')
    join(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      client.join(data);
      console.log("join_"+this.server.adapter.name);
      console.log("join_"+client.id);
    }

    @SubscribeMessage('leave')
    leave(@ConnectedSocket() client: Socket) {
      const roomsSize = this.rooms.length;
      let deleteIndex:number = 0 ;
      for (let index = 0; index < roomsSize; index++) {
        if(this.rooms[index].title===client.id){
          deleteIndex = index;
        }
      }
      this.rooms.splice(deleteIndex, 1);
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

    @SubscribeMessage('create')
    create(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      client.leave('lobby');
      const room:Room = new Room();
      room.title = data;
      room.player1 = this.users.get(client.id);
      this.rooms.push(room);
      console.log(room);
      client.join(room.title);
      this.server.emit('created', room);
    }

    @SubscribeMessage('check')
    check(@MessageBody() data: BingoBoard, @ConnectedSocket() client: Socket): BingoBoard {
      const userData:BingoBoard = data;
      return this.eventsService.checklogic(userData);
    }
  }