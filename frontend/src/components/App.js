import React from "react"
import '../styles/App.css';
import Header from "./Header";
import Post from "./Post"
import Login from "./Login"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Signin from "./Signup";

function App() {
  return (
    <Router>
      <div className="header">

        <Switch>
        
          <Route path={'/'}>
            <Login></Login>
            <Signin></Signin>
          </Route>
          
          <Header></Header>
          
        </Switch>

        <div className="contenu">
          <Post></Post>
        </div>
      </div>
    </Router>

  );
}

export default App;
