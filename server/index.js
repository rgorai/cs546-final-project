const reviews = require('./data/reviews')
const connection = require('./config/mongoConnection')

async function main() {
  try {
    console.log('Calling CreateReview -- Movie')
    const createReview = await reviews.createReview(
      '61aef805f7f062ce1b214705',
      'Tom',
      '61aef80ef7f062ce1b21470b',
      '12/07/2021',
      'Another random review of som random movie',
      0
    )
  } catch (e) {
    console.log(e)
  }

  // try {
  //   console.log("Calling CreateReview -- Show")
  //   const createReview = await reviews.createReview("61a85af1e1b2c3a87dd8806d", "Matt", "61a85b11e1b2c3a87dd880a4", "12/02/2021", "Some movie review", 1);
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   console.log('Calling removeReview -- Movie')
  //   const removeReview = await reviews.removeReview(
  //     '61a85afce1b2c3a87dd88072',
  //     '61a9bf513082c8e6fca95f39'
  //   )
  // } catch (e) {
  //   console.log(e)
  // }

  // try {
  //   console.log("Calling removeReview -- Show")
  //   const removeReview = await reviews.removeReview("61a85afce1b2c3a87dd88072", "61a8757e76f14e21f688739b");
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   console.log("Calling updateReview -- Movie")
  //   const createReview = await reviews.updateReview("61a9bf513082c8e6fca95f39", "61a85af1e1b2c3a87dd8806f", "Brad", "61a85afce1b2c3a87dd88072", "12/03/2021", "Updated my new review", 1);
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   console.log("Calling updateReview -- Show")
  //   const createReview = await reviews.updateReview("61a87c6d49d8abfcc6a8e3e2", "61a85af1e1b2c3a87dd8806c", "Matt", "61a85afce1b2c3a87dd88072", "12/02/2021", "Updated review", 0);
  // } catch (e) {
  //   console.log(e);
  // }
}

main().catch((e) => console.log('main error: ' + e))
