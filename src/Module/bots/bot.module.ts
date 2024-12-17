import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from '@nestjs/axios';
import { BotService } from "./bot.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [],
  providers: [
    BotService
  ],
  exports: [],
})
export class BotModule {}
