import React from "react";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import ComicContainer from "./containers/ComicContainer";
import CancelContainer from "./containers/CancelContainer";
import Header from "./components/Header";
import HeaderCancel from "./components/HeaderCancel";
import Footer from "./components/Footer";
import FooterCancel from "./components/FooterCancel";

import "./App.css";

const App = () => {

  return (
    <Router>
      <div className="appjs">
        <Route exact path="/" render={() => (<div><Header bigText="Top 1000 Comedians of 2019!" /> <ComicContainer /> <Footer link="/cancelled" linkText="View Cancelled Comedians" /></div>)} />
        <Route path="/cancelled" render={() => (<div><HeaderCancel bigText="Top Cancelled Comedians of 2019!" /> <CancelContainer /><FooterCancel link="/" linkText="View Top 1000 Comedians" /> </div>)} />
      </div>



    </Router>

  )

}


export default App;
