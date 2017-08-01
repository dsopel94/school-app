import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Switch } from 'react-router';
import SignUpPage from './SignUpPage/SignUpPage';
import LoginPage from './LoginPage/LoginPage';
import DashboardPage from './DashboardPage/DashboardPage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';
import { Router } from 'react-router';
import AddCoursePage from './AddCoursePage/AddCourseForm';
import CoursePage from './CoursePage/CoursePage';
import AddStudentPage from './AddStudentPage/AddStudentPage';
import EditStudentPage from './EditStudentPage/EditStudentPage';
import ShowStudentInfo from './ShowStudentInfo/ShowStudentInfo';
import EditCoursePage from './EditCoursePage/EditCoursePage';
import AddInfoPage from './AppInfoPage/AppInfoPage';

// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const routes = (
  <Provider store={store}>
    <BrowserRouter>

      <div>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/auth/dashboard" component={DashboardPage} />
        <Route exact path="/addCourse" component={AddCoursePage} />
        <Route exact path="/courses/:cuid" component={CoursePage} />
        <Route exact path="/addStudent/:cuid" component={AddStudentPage} />
        <Route exact path="/editStudent/:cuid" component={EditStudentPage} />
        <Route exact path="/editCourse/:cuid" component={EditCoursePage} />
        <Route exact path="/" component={AddInfoPage} />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
