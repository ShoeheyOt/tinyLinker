import { MongoClient } from "mongodb";

/**
 * a function to connect to mongo DB with try/catch method, finally disconnect(close)
 * @param {*} callback a function to be invoked if successfully connect to mongoDB
 * @returns return value of callback
 */
export default async function main(callback) {
  const uri = process.env.MONGODB_URL;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const result = await callback(client);

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
