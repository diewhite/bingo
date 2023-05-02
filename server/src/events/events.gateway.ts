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
import { User } from './dto/events.user.dto';
  
  @WebSocketGateway(4005, {
    cors: {
      origin: '*',
    },
  })
  
  export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;
    
    public users: Map<string, User> = new Map();
    public rooms = [];

    handleConnection(Client: Socket) {
      console.log(Client.id+" connected!");
            
    }
    handleDisconnect(Client: Socket) {
      console.log(this.users.get(Client.id)+" disconnected!");
      this.users.delete(Client.id);
    }
    @SubscribeMessage('information')
    information(@MessageBody() name: string , @ConnectedSocket() client: Socket) {
      const user = new User;
      user.name = name;
      this.users.set(client.id, user);
      console.log("client id : "+client.id);
      console.log("client name : "+user.name);
    }

    @SubscribeMessage('newMessage')
    message(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      const user: User = this.users.get(client.id);
      const message = {
        name : user.name,
        text : data,
      }
      const roomName = user.roomName;
      console.log("roomName : "+roomName);
      if(roomName===undefined){
        this.server.emit('onMessage', message);
      }else{
        this.server.to(roomName).emit('onMessage', message);
      }
      console.log(message.name+" : "+message.text);
    }

    @SubscribeMessage('join')
    join(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      client.join(data);
      console.log("join_"+this.server.adapter.name);
      console.log("join_"+client.id);
    }

    @SubscribeMessage('leave')
    leave(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      console.log("leave_"+client.rooms);
      client.leave(data);
      console.log("leave_"+client.id);
    }

    @SubscribeMessage('check')
    check(@ConnectedSocket() client: Socket) {
      console.log(this.users.get(client.id));
      console.log(this.rooms.length);
    }

    @SubscribeMessage('create')
    create(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      const user = this.users.get(client.id);      
      user.title = data;
      user.roomName = client.id;
      client.join(user.roomName);
      this.server.emit('created', user);
    }
  }