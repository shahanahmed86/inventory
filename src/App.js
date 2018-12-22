//Basic Component
import React, { Component } from 'react';
import { Provider } from 'react-redux'

//store
import store from './store/store';

//Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Custom CSS
import './App.css';

//Custom Component
import Login from './component/login';
import Dashboard from './component/dashboard';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;