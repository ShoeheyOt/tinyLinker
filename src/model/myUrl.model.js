import randomstring from "randomstring";
import main from "../utils/main.js";

const DB = process.env.MONGODB_DB_NAME;
const COLLECTION = process.env.MONGODB_COLLECTION_URLS;

export default class MyUrl {
  /**
   *URL class
   * @param {*} originalUrl original URL a client want to save
   * @param {*} userId an ID originalUrl is associated with
   */
  constructor(originalUrl, userId) {
    this._id = crypto.randomUUID();
    this.originalUrl = originalUrl;
    this.shortUrl = randomstring.generate(7);
    this.userId = userId;
  }

  /**
   * static method to fetch urls which are associated with userId
   * @param {*} userId an Id for searching Urls from database
   * @param {*} callback to be invoked with parameter urls if successfully (found 0 url included) fetch the data
   */
  static async fetchUrls(userId, callback) {
    const urls = await main(async (client) => {
      try {
        const cursor = await client
          .db(DB)
          .collection(COLLECTION)
          .find({ userId });
        const result = await cursor.toArray();
        return result;
      } catch (error) {
        console.error(error);
      }
    });
    callback(urls);
  }

  /**
   * this method is to save new url to database
   * @param {*} callback to be invoked if successfully save a url to database
   */
  async saveUrl(callback) {
    const result = await main(async (client) => {
      try {
        const data = await client.db(DB).collection(COLLECTION).insertOne(this);
        return data;
      } catch (err) {
        console.error(err);
      }
    });

    console.log("successfully created URLs", result.insertedId);
    callback();
  }

  /**
   * static method to find a url from database
   * @param {*} _id a key to find particular data
   * @param {*} callback to be invoked if successfully find one from database
   */
  static async findOneUrl(_id, callback) {
    const theUrl = await main(async (client) => {
      try {
        const result = await client
          .db(DB)
          .collection(COLLECTION)
          .findOne({ _id });
        return result;
      } catch (error) {
        console.error(error);
      }
    });

    callback(theUrl);
  }

  /**
   * static method to update original url
   * @param {*} _id a key to find a particular data to be changed
   * @param {*} updatedUrl a url to be changed
   * @param {*} callback to be invoked if successfully update url
   */
  static async updateUrl(_id, updatedUrl, callback) {
    const result = await main(async (client) => {
      try {
        const updatedData = await client
          .db(DB)
          .collection(COLLECTION)
          .updateOne({ _id }, { $set: { originalUrl: updatedUrl } });
        return updatedData;
      } catch (error) {
        console.error(error);
      }
    });

    console.log(`successfully updated ${result.matchedCount}`);
    callback();
  }

  /**
   * static method to delete a data
   * @param {*} _id a key to find a data to be deleted
   * @param {*} callback to be invoked if success
   */
  static async deleteUrl(_id, callback) {
    const result = await main(async (client) => {
      try {
        const data = await client
          .db(DB)
          .collection(COLLECTION)
          .deleteOne({ _id });
        return data;
      } catch (error) {
        console.error(error);
      }
    });

    console.log(`${result.deletedCount} successfully deleted`);
    callback();
  }
}
