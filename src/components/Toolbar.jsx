import React from 'react';
import BackButton from './BackButton';
import SearcherTextBox from './SearcherTextBox';
import {connect} from 'react-redux'


function Toolbar(props) {

  return (
    <div className="Toolbar">
        {props.isBackButton && <BackButton/>}
        {props.isSearchTextBox && <SearcherTextBox/>}
        <div>
          <button className="btn" type="button" onClick={() => console.log("User")}>User</button>
        </div>
    </div>
  );
}

const mapStateToProps = state => ({
    isBackButton: state.toolbar.isBackButton,
    isSearchTextBox: state.toolbar.isSearchTextBox
  })

export default connect(mapStateToProps)(Toolbar);
  