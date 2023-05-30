import redis from "redis";
import dotenv from 'dotenv';
dotenv.config();

export const redisClient =  await redis.createClient({
  legacyMode: true,
  host: process.env.SERVER_HOST,
  port: process.env.REDIS_PORT,
});


await redisClient.on('error', (err) => {
  console.log(`Redis error: ${err}`);
    redisClient.quit();
})


redisClient.connect();


export const set = (key, value) => {
    redisClient.set(key, JSON.stringify(value));
  };
  
export  const get = (req, res, next) => {
    let key = req.originalUrl;
  
    redisClient.get(key, (error, data) => {
      if (error) {
        res.status(400).send({
          ok: false,
          message: error,
        });
      }
      if (data !== null) {
        console.log('data from redis!');
        res.status(200).send({
          ok: true,
          data: JSON.parse(data),
        });
      } else next();
    });
  };
  


