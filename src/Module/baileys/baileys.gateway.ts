import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BaileysService } from './baileys.service';

@WebSocketGateway()
export class BaileysGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private baileysService: BaileysService) {}

  // Se llama cuando un cliente se conecta
  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
  }

  // Se llama cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado:', client.id);
  }

  // Recibe mensajes de los clientes con @SubscribeMessage
  @SubscribeMessage('message')  // El evento 'message' es solo un ejemplo, ajusta según tu necesidad
  handleMessage(client: Socket, payload: any) {
    console.log('Mensaje recibido:', payload);

    // Aquí podrías procesar el mensaje y enviar algo de vuelta
    this.server.emit('message', { message: 'Mensaje procesado' });
  }
}