import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Injectable } from "@nestjs/common";



@Injectable()
export class AgentExample{
  private async model(){
      return new ChatGoogleGenerativeAI({
        model: "gemini-1.5-pro",
        temperature: 0,
        maxRetries: 2,
      });
    }
  

  private async Agent(){
    /*
    const llm = await this.model();
    const Agent = createAgent(
      llm,
      [this.toolEmpty()],//usamos el misma herramienta para el ejemplo
      promptAgent,
    );
    return async function Agent(
      state: IState,
      config?: RunnableConfigLike,
    ){
      const result = await Agent.invoke(state, config);
      const messages = [
        ...state.messages,
        new AIMessage({ content: result.output, name: 'Agent' }),
      ];
      return {
        ...state,
        messages,
        respuestaAgent: result.output //aqui guardamos la respuesta final, es la que devuelve al final el Agente en General
      };
    }
    */
  }

  async SupervisorAgent(){
    /*
    const llm = await this.model();
    const supervisor = createAgent(
      llm, //config Ai
      [this.toolEmpty()],//Herramienta es obligatoria, en este caso esta herramienta no hace nada
      promptSupervisor,//prompt para el supervisor
    );
    return async function supervisorNode(
      state: IState,
      config?: RunnableConfig,
    ) {
      const result = await supervisor.invoke(state, config);//aqui es donde se executa el supervisor
      const messages = [//variable que usamos para armar un historial interno
        ...state.messages,
        new AIMessage({ content: result.output, name: 'Supervisor' }),
      ];
      return{
        ...state,//paramos el state actualizado para el proximo agente 
        messges,//aca armamos una especie de historial de mensajes que es -interno- para armar un flujo
        next: result.output //es el agente que que va a continuar la tarea 
      }
    */
  }

  private toolEmpty() {
    /*
    return new DynamicTool({
      name: 'empty_tool',//name de la herramienta
      description: '',//un descripcion interna
      func: async (input: string) => {//funcion de lo que va a realizar el acente
        return '';//
      },
    });
  }

  async invokeGraph(){
  /*
    members: name agents
    const members = ['nameAgent'];

    llamamos a los nodos, agentes y supervisor
    ...
    const agentNode = await this.Agent();
    const agentNode = await this.SupervisorAgent();

    se crea el flujo de trabajo incluyendo las variables state
    const workflow = new StateGraph<IState, unknown, string>({
      channels: agentStateChannels,
    })
      .addNode('nameAgent',agentNode)
      .addNode('Supervisor',SupervisorAgent)

    (condicion para el supervisor)
    workflow.addConditionalEdges('Supervisor', (x: IState) => x.next);

    creamos en un fujo al cual se tiene que adaptar el Agente en general (esto incluye supervisor y los nodos)
    workflow.addEdge(START, 'Supervisor');
    workflow.addEdge('Agent', END)

    compilamos el workflow
    const graph = await workflow.compile();

    y ahora lo invocamos 
    const graphStreams = await graph.stream(
      {
        messages: [//aca armamos una especie de historial de mensajes que es -interno-
          new HumanMessage({
            content: input,//entrada de conversacion humana
          }),
        ],
        input: input,//entrada de conversacion humana
        client_id: data.clientId,
        history: chatHistory,
        cart: messageData.cart,
      },
      { recursionLimit: 10 },//limite para que no se extienda en los siclos que puede dar
    );

    tomamos el resultado final, o sea lo ultimo que se guardo en alguna variable "state"
    let finalResult;
    for await (const output of graphStreams) {
      if (!output?.__end__) {
        finalResult = output;
      }
    }

    return finalResult.respuestaAgent

  */
  }
}