import React from 'react';
import BackButton from './BackButton';
import SearcherTextBox from './SearcherTextBox';
import UserButton from './UserButton';
import {connect} from 'react-redux'


function Toolbar(props) {

  return (
    <div className="Toolbar">
        {props.isBackButton && <BackButton/>}
        {props.isSearchTextBox && <SearcherTextBox/>}
        <UserButton/>
    </div>
  );
}

const mapStateToProps = state => ({
    isBackButton: state.toolbar.isBackButton,
    isSearchTextBox: state.toolbar.isSearchTextBox
  })

export default connect(mapStateToProps)(Toolbar);
  