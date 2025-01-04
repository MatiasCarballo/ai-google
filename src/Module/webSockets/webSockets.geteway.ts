import { OnModuleInit } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { WebSocketService } from "./WebSockets.service";

@WebSocketGateway({ cors: '*:*' })
export class WebSocket 
  implements OnModuleInit
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly webSocketService: WebSocketService
  ){}

  onModuleInit() {
    this.server.on('connection', (socket: Socket)=>{

      
      socket.on('message', async(data)=>{
        const resIA = await this.webSocketService.chatIA(data);
        socket.emit('resp', resIA);
      })
    })
  }
}