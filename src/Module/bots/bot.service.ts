import { GoogleGenerativeAI } from "@google/generative-ai";
import { BaseMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Injectable } from "@nestjs/common";
import { promptPrueba1 } from "./prompts/bot.prompt";

@Injectable()
export class BotService {

  constructor(){}

  private async model(){
    return new ChatGoogleGenerativeAI({
      model: "gemini-1.5-pro",
      temperature: 0,
      maxRetries: 2,
    });
  }

  async invokeFlow(input:string, history?:BaseMessage[]){
    console.log(input);
    
    const llm = await this.model();
    const promptAgent = promptPrueba1;
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', promptAgent],
      ["human", "{input}"]
    ]);
    const chain = prompt.pipe(llm);
    const response = await chain.invoke({
      input
    });
    
    return response.content;
  }
}