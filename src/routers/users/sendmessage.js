import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import CryptoJS from 'crypto-js';




const date = Date.now().toString();
const uri = process.env.SENS_SERVICE_ID
const secretKey = process.env.SENS_SECRET_KEY
const accessKey = process.env.SENS_ACCESS_KEY
const method = 'POST';
const space = " ";
const newLine = "\n";
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
const url2 = `/sms/v2/services/${uri}/messages`;

const  hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(accessKey);

const hash = hmac.finalize();

const signature = hash.toString(CryptoJS.enc.Base64);



export const sendmessage = async(req,res) => {

    const { phoneNumber } = req.body;

    let formattedPhoneNumber = phoneNumber.replace(/-/g, '');
    formattedPhoneNumber = parseInt(formattedPhoneNumber);


    console.log(formattedPhoneNumber);
    console.log(typeof(formattedPhoneNumber));


    //인증번호 생성
    const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;


    axios({
        method: method,
        json: true,
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'x-ncp-iam-access-key': accessKey,
          'x-ncp-apigw-timestamp': date,
          'x-ncp-apigw-signature-v2': signature,
        },
        data: {
          type: 'SMS',
          contentType: 'COMM',
          countryCode: '82',
          from: '01040299389',
          content: `[Well-Living] 인증번호 [${verifyCode}]를 입력해주세요.`,
          messages: [
            {
              to: `${formattedPhoneNumber}`,
            },
          ],
        }, 
        })
        .then(response => {
          console.log(response.data);
          res.status(200).send({
              ok: true,
              msg: verifyCode,
          });
      })
        .catch((err) => {
            console.log(err);
            res.status(409).send("msg" + err.message);
        });

    }

