const redis = require("redis");
const redisClient = redis.createClient({ url: process.env.REDIS_URI });
const { REDIS_DEFAULT_EXPIRATION } = require("../configs/config");

const redisInit = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connection Established . . .");
  } catch (e) {
    console.log("Failed Connecting to Redis . . .");
    console.log(e);
  }
};

const cacheGetterSetter = (key, cb, expiration = REDIS_DEFAULT_EXPIRATION) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await redisClient.get(key);
      if (data) {
        resolve(JSON.parse(data));
      } else {
        const newCacheData = await cb();
        redisClient.setEx(key, expiration, JSON.stringify(newCacheData));
        resolve(newCacheData);
      }
    } catch (e) {
      reject(`Error occurred, ${e.message}`);
    }
  });
};

module.exports = {
  redisInit,
  cacheGetterSetter,
  redisClient,
};
