import React from "react"
import '../styles/App.css';
import Header from "./Header";
import Post from "./Post"
import Login from "./Login"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Signin from "./Signup";
import Logout from "./Logout";
import Profile from "./Profile";
import PageProfile from "./PageProfile"
import Home from "./HomeButton";



function App() {
  return (
    <div className="appli">
    <Router>

      <div className="header">
        
        <Login></Login>
        <Logout></Logout>
        <Signin></Signin>
        <Profile/>
        <Home />
        <Header />
    </div>
    <div>
        <Switch>

          


          
          <Route exact path={"/profile"}>
            <PageProfile />
          </Route>
          <Route path={"/"}>
            <div className="contenu">
            
              <Post></Post>
            </div>
          </Route>
          
                        

        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
