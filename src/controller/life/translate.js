import { config } from 'dotenv';
config();
import request from "request";


export const translate = (letter)=> {

    return new Promise((resolve, reject) => {
        var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
        var options = {
            url: api_url,
            form: {'source':'ko', 'target':'en', 'text':letter},
            headers: {'X-Naver-Client-Id':process.env.PAPAGO_CLIENT_ID, 'X-Naver-Client-Secret': process.env.PAPAGO_CLIENT_SECRET}
        };
        request.post(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              const translatedResponse = JSON.parse(body).message.result.translatedText;
              resolve(translatedResponse);

            } else {
              reject(error || response.statusCode);
            }
        });
    });
  };


export default translate;