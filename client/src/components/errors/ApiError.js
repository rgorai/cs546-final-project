import '../../styles/errors/apiError.css'

const ApiError = (props) => {
  return (
    <div className="not-found-container">
      <div>{props.status}</div>
      <div>{props.statusMessage}</div>
    </div>
  )
}

export default ApiError
