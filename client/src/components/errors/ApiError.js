import '../../styles/errors/apiError.css'

const ApiError = (props) => {
  const { error } = props
  return (
    <div className="api-error-container">
      <div>{error.status}</div>
      <div>{error.statusText}</div>

      {/* for dev use only */}
      <div>{error.data}</div>
    </div>
  )
}

export default ApiError
