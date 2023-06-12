import { Configuration, OpenAIApi } from 'openai';

class OpenAI {
    openai: OpenAIApi;

    constructor(apiKey: string) {
        if (!apiKey) {
            console.log("Cannot initialize, no openai api key");
        }
        this.openai = new OpenAIApi(new Configuration({ apiKey }));
    }
    async generateText(prompt: string, model: string, max_tokens: number, temperature = 0.85) {
        try {
            const response = await this.openai.createCompletion({
                model,
                prompt,
                max_tokens,
                n: 1,
                temperature,
            });
            return response.data.choices[0].text;
        } catch (error) {
            throw error;
        }
    }
    async generateImage(prompt: string) {
        try {
            const response = await this.openai.createImage({
                prompt: prompt,
                n: 1,
                size: "256x256"
            });
            const image_url = response.data.data[0].url;
            return image_url;
        } catch (error) {
            throw error;
        }
    }
}

export default OpenAI;