import {
  OnGatewayDisconnect,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OpenAI } from 'openai';
import { config } from 'dotenv';
config();
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  private openai: OpenAI;
  constructor() {
    this.openai = new OpenAI({
      apiKey: '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',
    });
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.server.emit('message', payload); //envoi
    console.log({ payload });
    return 'Hello world!';
  }
  @SubscribeMessage('chat-message')
  async handleChatMessage(client: any, payload: any): Promise<string> {
    this.server.emit('chat-message', payload);
    return 'Hello world!';
  }
  handleConnection(client: any) {
    console.log('client connected', client.id);
  }
  handleDisconnect(client: any) {
    console.log('client disconnected', client.id);
    this.handleConnection;
  }
  @SubscribeMessage('translate')
  async handleTranslateMessage(client: any, payload: { content: string }) {
    const { content } = payload;
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: ' traduit moi les phrases suivantes en anglais',
        },
        { role: 'user', content: 'voici la phrase à traduire:' + content },
      ],
      max_tokens: 150,
      stop: ['\n'],
      temperature: 0.5,
    });
    const translateContent = response.choices[0].message.content;
    this.server.emit('translate', translateContent); // envoie
  }
}
