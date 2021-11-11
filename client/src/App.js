import HomePage from './components/home/HomePage'
import UserList from './components/users/UserList'
import PostList from './components/posts/PostList'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
        
      </Router>
    </div>
  )
}

export default App