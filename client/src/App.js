import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import Home from "./pages/home/Home";
import User from './pages/user/User';
import Leaderboard from './pages/leaderboard/leaderboard';
import AddAccounts from './pages/addAccounts/addAccounts';
import AddLolProfile from "./pages/addLolProfile/addLolProfile";
import AddApexProfile from "./pages/addApexProfile/addApexProfile";
import AddOverwatchProfile from "./pages/addOverwatchProfile/addOverwatchProfile";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginContainer}/>
        <Route path="/login" component={LoginContainer}/>
        <Route exact path="/signup" component={SignUpContainer}/>
        <Route component={DefaultContainer}/>
      </Switch>
    </Router>
  );
}

const LoginContainer = () => (
    <div className="container">
      <Route exact path='/' render={() => <Redirect to='/login' />} />
      <Route path='/login' component={Login} />
    </div>
)

const SignUpContainer = () => (
  <div className="container"><SignUp /></div>
)

const DefaultContainer = () => (
  <div>
  <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route path="/home"> <Home /> </Route>
          <Route path="/user"> <User /> </Route>
          <Route path="/leaderboard"> <Leaderboard /> </Route>
          <Route path="/addAccounts"> <AddAccounts /> </Route>
          <Route path="/addLolProfile"> <AddLolProfile /> </Route>
          <Route path="/addApexProfile"> <AddApexProfile /> </Route>
          <Route path="/addOverwatchProfile"> <AddOverwatchProfile /> </Route>
        </Switch>
      </div>
  </div>
)

export default App;
