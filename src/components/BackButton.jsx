import React from 'react';
import { withRouter } from 'react-router-dom';



function NavigationBar(props) {

  return (
    <nav className="NavigationBar">
        <div>
          <button className="btn" type="button" onClick={() => props.history.goBack()}>Back</button>
        </div>
    </nav>
  );
}

export default withRouter(NavigationBar);