import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/movies/moviePage.css'
const axios = require('axios')





// replace all
const user = (props) => {
  return (
    <div className="post-container">
      <div>
        {props.title}
      </div>
      <div>
        {props.posterName}
      </div>
      <div>
        {props.body}
      </div>
    </div>
  )
}

export default user