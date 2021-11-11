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