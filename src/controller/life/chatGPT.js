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
            "content": "I'll give you a suicide note with a person's life now If there's a name in the suicide note, please answer by mentioning the name of the person Read the suicide note carefully and tell the person who wrote the suicide note that he/she has lived well, such as courageous words, hopeful words, and well. So answer carefully (except for the word suicide) The answer must be in Korean",
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