import '../../styles/errors/apiError.css'

const ApiError = (props) => {
  const { error } = props
  return (
    <div className="flex-vertical card-background error-container">
      <div className="error-status">{error.status}</div>
      <div className="error-text">{error.statusText}</div>

      {/* for dev use only */}
      <div>{error.data}</div>
    </div>
  )
}

export default ApiError
