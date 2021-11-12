const connection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;

async function main() {
  const db = await connection.connectToDb()
  await db.dropDatabase();

  
  
  console.log('Done seeding database');
  connection.closeConnection()
}

main()
