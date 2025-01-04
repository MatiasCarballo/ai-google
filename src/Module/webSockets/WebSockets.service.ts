import { Injectable } from "@nestjs/common";
import { BotService } from "../bots/bot.service";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class WebSocketService{
  private botService:BotService
  constructor(
      private readonly moduleRef: ModuleRef
    ){}

  onModuleInit(){
    this.botService = this.moduleRef.get(BotService, {
      strict: false,
    });
  }

  async chatIA(data:string){
    return await this.botService.invokeFlow(data);
  }
}