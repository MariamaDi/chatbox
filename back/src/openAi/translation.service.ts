// openai.service.ts
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class TranslationService {
  private readonly openai: OpenAI;
  constructor() {
    this.openai = new OpenAI({
      apiKey: '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',
    });
  }
  async getChatCompletion(text: string): Promise<string> {
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Traduit moi le message suivant en Anglais:${text}`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    return chatCompletion.choices[0].message.content;
  }
  async translateText(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ): Promise<string> {
    try {
      const response = await this.openai.completions.create({
        prompt: `Traduisez le texte suivant de ${sourceLanguage} à ${targetLanguage}: "${text}"`,
        temperature: 0.5,
        max_tokens: 100,
        model: 'gpt-3.5-turbo',
      });
      const traduction = response.choices[0].text.trim().split('"')[1].trim();
      return traduction;
    } catch (error) {
      console.error('Error translating text:', error);
      throw new Error('Unable to translate text');
    }
  }
}
