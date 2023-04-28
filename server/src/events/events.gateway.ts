import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Socket, Server } from 'socket.io';
  
  @WebSocketGateway(4005, {
    cors: {
      origin: '*',
    },
  })
  
  export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    private users = new Map();

    handleConnection(client: Socket) {
      console.log(Socket.name+" connected!");
      
    }
    handleDisconnect(client: Socket) {
      console.log(Socket.name+" disconnected!");
    }
    @WebSocketServer()
    server: Server;
 
    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
      return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }
  
    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
      return data;
    }

    @SubscribeMessage('chat')
    async onChat(@MessageBody() data: string): Promise<string> {
      return data;
    }

    @SubscribeMessage('information')
    information(@MessageBody() information: any){
      console.log("id: "+information.id);
      console.log("name: "+information.name);
      this.users.set(information.name,information.id);
      console.log("map에서 test호출"+this.users.get("test"));
    }
  }