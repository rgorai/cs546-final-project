const MovieDetail = (props) => {
  return (
    <tr className="media-detail-container">
      <td>{props.label}</td>
      <td>{props.data}</td>
    </tr>
  )
}

export default MovieDetail
