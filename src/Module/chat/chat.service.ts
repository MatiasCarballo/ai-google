import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { BotService } from "../bots/bot.service";


@Injectable()
export class ChatService{
  private botService:BotService
  constructor(
    private readonly moduleRef: ModuleRef
  ){}

  onModuleInit(){
    this.botService = this.moduleRef.get(BotService, {
      strict: false,
    });
  }

  async PruebaChat(input:string){
    return await this.botService.invokeFlow(input);
  }
}