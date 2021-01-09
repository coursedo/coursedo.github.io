import ForgotPassword from 'pages/ForgotPassword'
import Home from 'pages/Home'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import CreatePasswordPage from 'pages/CreatePassword'
import VerifyEmailPage from 'pages/VerifyEmail'
import { HashRouter as Router, Route } from 'react-router-dom'
import { history } from 'ultis/functions'
import './App.less'
import Dashboard from 'pages/Dashboard'

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/reset/:token" component={CreatePasswordPage} />
      <Route path="/verify/:token" component={VerifyEmailPage} />
      <Route path="/admin" component={Dashboard} />
    </Router>
  )
}

export default App
