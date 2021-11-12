import React from 'react';

const Movie = (props) => {
  return (
    <div className="movie-container">
      <div>
        {props.name}
      </div>
      <div>
        {props.lastyearName}
      </div>
      <div>
        {props.mpaRating}
      </div>
      <div>
        {props.description}
      </div>
    </div>
  )
}

export default Movie