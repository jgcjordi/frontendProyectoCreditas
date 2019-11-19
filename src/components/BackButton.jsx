import React from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/ArrowBackRounded';



function BackButton(props) {

  return (
    <div className="BackButton" style={{visibility: props.visibility}}>
      <IconButton edge="center" color="inherit" onClick={() => props.history.goBack()}>
            <MenuIcon color="secondary"/>
      </IconButton>
    </div>
  );
}

export default withRouter(BackButton);