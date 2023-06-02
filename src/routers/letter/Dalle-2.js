import { Configuration, OpenAIApi } from "openai";
import { config } from 'dotenv';
import { translate } from './translate.js';

config();



const openaiConfig = new Configuration({
    apiKey: process.env.GPT_KEY,
  });


  const openai = new OpenAIApi(openaiConfig);

const numberOfImages = 1;
const imageSize = "256x256";


export const generateMemoryImage = async (req, res) => {
    try {
      const { memories } = req.body;
      const results = [];
    
      console.log(memories);


      for (const memory of memories) {
        const prompt = await translate(memory);

        const data = await openai.createImage({
          prompt,
          n: numberOfImages,
          size: imageSize
        });
        results.push(data.data.data);
      }
  
      console.log(results);
      res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating images");
    }
  };
  



export default generateMemoryImage;