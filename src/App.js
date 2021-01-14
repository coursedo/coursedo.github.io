import Courses from 'pages/Courses'
import CreateCourse from 'pages/CreateCourse'
import CreatePasswordPage from 'pages/CreatePassword'
import Dashboard from 'pages/Dashboard'
import EditCourse from 'pages/EditCourse'
import ForgotPassword from 'pages/ForgotPassword'
import Home from 'pages/Home'
import MyCourses from 'pages/MyCourses'
import Profile from 'pages/Profile'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import VerifyEmailPage from 'pages/VerifyEmail'
import { HashRouter as Router, Route } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { history } from 'ultis/functions'
import './App.less'

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/reset/:token" component={CreatePasswordPage} />
      <Route path="/verify/:token" component={VerifyEmailPage} />
      <Route path="/create" component={CreateCourse} />
      <Route path="/admin" component={Dashboard} />
      <Route path="/courses" component={Courses} />
      <Route path="/profile" component={Profile} />
      <Route path="/my-courses" component={MyCourses} />
      <Route path="/course/:courseId/edit" component={EditCourse} />
    </Router>
  )
}

export default App
