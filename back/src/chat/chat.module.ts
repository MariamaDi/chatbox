import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TranslationService } from 'src/openAi/translation.service';
import { config } from 'dotenv';
config();

@Module({
  providers: [ChatGateway, TranslationService],
  // providers: [ChatGateway, TranslationService],
})
export class ChatModule {}
