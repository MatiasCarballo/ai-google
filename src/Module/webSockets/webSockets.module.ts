import { Module } from "@nestjs/common";
import { WebSocket } from "./webSockets.geteway";
import { WebSocketService } from "./WebSockets.service";


@Module({
  providers:[WebSocket, WebSocketService]
})
export class WebSocketModule{}