const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const shows = mongoCollections.shows;
const movies = mongoCollections.movies;

//create review for a specific userId
const createReview = async (
    _id,
    reviewerId,
    reviewer,
    contentId,
    dateOfReview,
    review,
    like_dislike
) => {
    try {

        const users = await movieCollection();
        const user = await users.findOne({ _id: contentId });

        const movies = await movieCollection();
        const movie = await movies.findOne({ _id: contentId });

        const shows = await movieCollection();
        const show = await shows.findOne({ _id: contentId });

        if (!user)
            throw 'Error: failed to find user.';

        if (!movie || !user)
            throw 'Error: failed to find the content you are looking for.';

        const newReview = {
            _id: ObjectId(),
            reviewerId: reviewerId,
            reviewer: reviewer,
            contentId: contentId,
            dateOfReview: dateOfReview,
            review: review,
            like_dislike: like_dislike
        };

        if (!movie) {
            show.reviews.push(newReview);

            const updatedInfo = await show.updateOne(
                { _id: ObjectId(show._id) },
                {
                    $push: { reviews: newReview },
                    $set: { overallRating: newOverallRating },
                }
            );

            if (updatedInfo.modifiedCount !== 1) {
                throwError(
                    ErrorCode.INTERNAL_SERVER_ERROR,
                    "Error: Could not add review."
                );
            }

            return await getReview(newReview._id);
        }

        if (!show) {
            movie.reviews.push(newReview);

            const updatedInfo = await movie.updateOne(
                { _id: ObjectId(movie._id) },
                {
                    $push: { reviews: newReview },
                    $set: { overallRating: newOverallRating },
                }
            );

            if (updatedInfo.modifiedCount !== 1) {
                throwError(
                    ErrorCode.INTERNAL_SERVER_ERROR,
                    "Error: Could not add review."
                );
            }

            return await getReview(newReview._id);
        }
    } catch (error) {
        throwCatchError(error);
    }
}

module.exports = {
    createReview
}