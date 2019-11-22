import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';




function SnackBarTimer(props) {

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={props.open}
      autoHideDuration={2500}
      onClose={props.onClose}
      ContentProps={{
        'aria-describedby': 'message-no-purchases',
      }}
      message={<span id="message-id">{props.message}</span>}
    />
  );
}

export default SnackBarTimer