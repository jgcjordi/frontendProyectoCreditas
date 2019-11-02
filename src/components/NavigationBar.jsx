import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';



function NavigationBar(props) {

  return (
    <nav className="NavigationBar">
      <form className="navigationBarForm">
        <div>
          <button className="btn" type="button" onClick={() => props.history.goBack()} >Atras</button>
        </div>
        <div>
          <NavLink className="navigation-link" to='/phones' activeClassName='active'>
            <button className="btn" type="button">Login</button>
          </NavLink>
        </div>
      </form>
    </nav>
  );
}

export default withRouter(NavigationBar);