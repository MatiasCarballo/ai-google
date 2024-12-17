import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ChatService } from "./chat.service";


@ApiTags('Chat')
@Controller('chat')
export class ChatController{
  constructor(
    private chatService:ChatService
  ){}

  @Get('/:input')
  @HttpCode(HttpStatus.OK)
  async chat(@Param('input') input:string){
    const result = await this.chatService.PruebaChat(input);
    return { statusCode: HttpStatus.OK, result };
  }
}  