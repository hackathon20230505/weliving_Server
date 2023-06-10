import { config } from 'dotenv';
config();
import { Configuration, OpenAIApi } from 'openai';


const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.GPT_KEY
}))

export const response =  async (req, res) => {
    try {
      const { userLetter } = req.body;
  
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "Read what you see and say something that can give courage and strength in a kind way. In Korean, more than 100 letters",
          },
          {
            "role": "user",
            "content": userLetter,
          },
        ],
      });
  
      const generatedResponse = response.data.choices[0].message.content;
      //const translatedResponse = await translate(generatedResponse)

      res.json({ response : generatedResponse })

     } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      res.status(500).json({ error: 'API 호출 중 오류가 발생했습니다.' });
    }
  };


export default response;