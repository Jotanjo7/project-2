import "./App.css";
import { React, Fragment } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Forms } from "./components/forms/Forms"
import Home from "./components/home/Home";
import { Details } from "./components/details/Details";
import { NavBar } from "./components/navbar/NavBar";
import { LandingPage } from "./components/landingPage/LandingPage";
// import { NotFound } from "./components/notound/NotFound"

function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
    <Fragment>
    <div className="App">
      <NavBar/>
      
        <Route exact path="/" component={ LandingPage } />
        <Route exact path="/home" component={ Home } />
        <Route path="/forms" component={ Forms } />
        <Route path="/recipes/:id" component={ Details } />
        {/* <Route exact path="*" element={<NotFound/>} /> */}

    </div>
    </Fragment>
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
