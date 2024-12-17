import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from '@nestjs/axios';
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";


@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [ChatController],
  providers: [
    ChatService
  ],
  exports: [],
})
export class ChatModule {}
