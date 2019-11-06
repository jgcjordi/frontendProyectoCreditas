import React from 'react';
import './App.css';

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Toolbar from './components/Toolbar';
import PhonesAll from './views/PhonesAll';
import PhoneDetail from './views/PhoneDetail';
import NotFound from './views/NotFound';
import PhonePurchased from './views/PhonePurchased';




function App() {
  return (
    <div className="App">
      <HashRouter basename='/'>
        <Toolbar/>
        <Switch>
          <Route path="/phones" exact component={PhonesAll} />
          <Route path="/phone/:id" exact component={PhoneDetail} />
          <Route path="/purchased" exact component={PhonePurchased} />
          <Redirect path='/' to='phones' />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
