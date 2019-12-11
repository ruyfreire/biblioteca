import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "../App";
import Home from "../templates/home/Home";
import AuthorBox from "../templates/author/Authors";
import BookBox from "../templates/book/Books";
// import PageWorking from "../templates/anyPages/PageWorking";
import NotFound from "../templates/anyPages/NotFound";

const rotas = () => {
  return (
    <Router>
      <Route>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/authors" component={AuthorBox} />
            <Route path="/books" component={BookBox} />
            {/* <Route path="/books" component={PageWorking} /> */}
            <Route path="*" component={NotFound} />
          </Switch>
        </App>
      </Route>
    </Router>
  );
};

export default rotas;
