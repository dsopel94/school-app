import React from 'react';
import { Route, IndexRoute, Router, BrowserRouter } from 'react-router';
import App from './modules/App/App';
import LoginPage from './modules/Post/pages/LoginPage/LoginPage.js';
// import SignUpPage from './modules/Post/pages/SignupPage/SignupPage.js';


const routes = (
  <BrowserRouter>
    <Route path="/" component={App}>
      <Route path="/signup" component={SignUpPage} />
    </Route>
  </BrowserRouter>);
