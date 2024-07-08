import main from "../utils/main.js";

const DB = process.env.MONGODB_DB_NAME;
const COLLECTION = process.env.MONGODB_COLLECTION_USERS;

export default class User {
  /**
   * User class
   * @param {*} email an email address to determine who a client is
   * @param {*} password a password to confirm account
   */
  constructor(email, password) {
    this._id = crypto.randomUUID();
    this.email = email;
    this.password = password;
  }

  /**
   * method to create user and save one to database
   */
  async createUser() {
    const result = await main(async (client) => {
      try {
        const result = await client
          .db(DB)
          .collection(COLLECTION)
          .insertOne(this);
        return result;
      } catch (err) {
        console.error(err);
      }
    });

    console.log(`success! ${result}`);
  }

  /**
   * a static method to find if a user is exist
   * @param {*} input key(s) to find particular user
   * @param {*} callback to be invoked if find one successful(even no found is success)
   */
  static async isRegistered(input, callback) {
    const result = await main(async (client) => {
      try {
        const cursor = await client
          .db(DB)
          .collection(COLLECTION)
          .findOne(input);
        return cursor;
      } catch (error) {
        console.error(error);
      }
    });

    callback(result);
  }
}
