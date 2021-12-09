const MovieDetail = (props) => {
  return (
    <tr className="media-detail-container">
      <td className="media-detail-label">{props.label}</td>
      <td className="media-detail-label">{props.data}</td>
    </tr>
  )
}

export default MovieDetail
