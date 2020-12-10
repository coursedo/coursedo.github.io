import Home from 'pages/Home'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import { HashRouter as Router, Route } from 'react-router-dom'
import { history } from 'ultis/functions'
import './App.css'

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Router>
  )
}

export default App
