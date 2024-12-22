import { Configuration, OpenAIApi } from 'openai'

export class AIService {
  private openai: OpenAIApi

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    })
    this.openai = new OpenAIApi(configuration)
  }

  async generateDescription(prompt: string): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 200,
        temperature: 0.7,
      })

      return response.data.choices[0]?.text?.trim() || ''
    } catch (error) {
      console.error('Error generating description:', error)
      return ''
    }
  }

  async generateImage(prompt: string): Promise<string | null> {
    try {
      const response = await this.openai.createImage({
        prompt,
        n: 1,
        size: '512x512',
      })

      return response.data.data[0]?.url || null
    } catch (error) {
      console.error('Error generating image:', error)
      return null
    }
  }

  async moderateContent(text: string): Promise<boolean> {
    try {
      const response = await this.openai.createModeration({
        input: text,
      })

      return !response.data.results[0]?.flagged
    } catch (error) {
      console.error('Error moderating content:', error)
      return false
    }
  }
}

export const aiService = new AIService() 