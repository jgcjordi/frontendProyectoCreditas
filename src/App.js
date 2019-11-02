import React from 'react';
import './App.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import PhonesAll from './views/PhonesAll';
import PhoneDetail from './views/PhoneDetail';
import NotFound from './views/NotFound';
import NavigationBar from './components/NavigationBar';


function App() {
  return (
    <div className="App">
      <HashRouter basename='/'>
        <NavigationBar />
        <Switch>
          <Route path="/phones" exact component={PhonesAll} />
          <Route path="/phone/:id" exact component={PhoneDetail} />
          <Redirect path='/' to='phones' />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
