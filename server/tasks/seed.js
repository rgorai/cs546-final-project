const connection = require('../config/mongoConnection')
const { create: createMovie } = require('../data/movies')

async function main() {
  const db = await connection.connectToDb()
  await db.dropDatabase()

  const wolf = await createMovie(
    'The Wolf of Wall Street', 
    2013,
    'R',
    'The Wolf of Wall Street follows the rise and fall of Jordan Belfort, who became a wealthy stockbroker before being found guilty of corruption and fraud by the federal government. Directed by Martin Scorsese and starring Leonardo DiCaprio, the film is based on Jordan Belfort’s memoir of the same name.'
  )
  const endgame = await createMovie(
    'Avengers: Endgame', 
    2019,
    'PG-13',
    'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\' actions and restore order to the universe once and for all, no matter what consequences may be in store.'
  )
  const dune = await createMovie(
    'Dune', 
    2021,
    'PG-13',
    'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet\'s exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity\'s greatest potential-only those who can conquer their fear will survive.'
  )
  
  console.log('Done seeding database');
  connection.closeConnection()
}

main()
