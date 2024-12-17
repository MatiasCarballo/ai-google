import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './DataBase/mongo.module';
import { ChatModule } from './Module/chat/chat.module';
import { BotModule } from './Module/bots/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    BotModule,
    ChatModule,
  ],
  controllers: []
})
export class AppModule {}
