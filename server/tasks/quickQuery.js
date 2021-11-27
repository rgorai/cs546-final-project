const { getMovieData } = require("./utils");

const NUM_MEDIA = 10;

// think about including backdrop on moviepage

const main = async () => {
  // get movie data
  console.log(await getMovieData(NUM_MEDIA));

  // get show data
};

main().catch((e) => {
  console.error(e);
});
