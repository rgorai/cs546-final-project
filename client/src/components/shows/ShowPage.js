import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import ApiError from '../errors/ApiError'
import '../../styles/shows/showPage.css'

import Youtube from 'react-youtube'

const opts = {
  height: '390',
  width: '640',
  playersVars: {
    autoplay: 1,
  },
}

// error when invalid id typed in route
const ShowPage = (props) => {
  const { id: showId } = useParams()
  const [showData, setShowData] = useState(null)
  const [error, setError] = useState(null)

  // request server with given movie id
  useEffect(() => {
    axios
      .get(`/api/shows/${showId}`)
      .then((res) => {
        setShowData(res.data)
        console.log(res.data)
      })
      .catch((e) => setError(e.response))
  }, [showId])

  useEffect(() => {
    if (showData) document.title = showData.name
  }, [showData])

  return (
    <>
      {error ? (
        <ApiError error={error} />
      ) : showData ? (
        <div className="show-page-container">
          <img
            className="show-page-img"
            src={
              showData.poster_path
                ? `https://image.tmdb.org/t/p/original${showData.poster_path}`
                : process.env.PUBLIC_URL + '/images/not-found.jpg'
            }
            alt="Show Poster"
          />
          <div className="show-name">{showData.name}</div>
          <div className="show-year">{showData.release_date}</div>
          <div className="show-description">{showData.description}</div>
          <div className="show-seasons">
            Total number of Seasons: {showData.number_of_seasons}
          </div>
          <div className="show-episodes">
            Total number of episodes: {showData.number_of_episodes}
          </div>
          <div>
            {showData.video ? (
              <Youtube videoId={showData.video.key} opts={opts} />
            ) : (
              <p>No Trailer Available</p>
            )}
          </div>
          <form action="">
            <div className="like-dislike">
              <label htmlFor="thumbs-up">
                Like:
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="icon"
                  id="thumbs-up"
                  size="2x"
                />
              </label>
              <label htmlFor="thumbs-down">
                {' '}
                Dislike:
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  className="icon"
                  id="thumbs-down"
                  size="2x"
                />
              </label>
            </div>
            <div className="reviews-container">
              <label htmlFor="userReview" className="desc-bold">
                {' '}
                My Review :
                <textarea
                  name="user-review"
                  id="user-review"
                  cols="100"
                  rows="1"
                  placeholder="Write your review here..."
                ></textarea>
              </label>
              <button>Post Review</button>
              <div className="previous-reviews desc">
                <h3>Previous Reviews</h3>
                <label htmlFor="" className="desc-bold">
                  User
                </label>
                <label htmlFor="" className="desc-bold">
                  Date Of Review
                </label>
                <label htmlFor="" className="desc-bold">
                  Liked / Disliked
                </label>
                <p className="desc">Review</p>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="loading">Loading</div>
      )}
    </>
  )
}

export default ShowPage
