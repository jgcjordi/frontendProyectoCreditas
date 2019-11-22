import React from 'react';
import BackButton from './BackButton';
import SearcherTextBox from './SearcherTextBox';
import UserButton from './UserButton';
import { connect } from 'react-redux';
import './Toolbar.scss';
import PhoneBear from '../assets/images/phoneBear.jpg'




function Toolbar(props) {

  return (
    <div className="Toolbar">
      <BackButton visibility={props.isBackButton ? 'visible' : 'hidden'} />
      <a className="linkLogo" href="http://localhost:3000">
        <img className="logo" src={PhoneBear} alt="Phone Bear logo"></img>
      </a>
      <SearcherTextBox visibility={props.isSearchTextBox ? 'visible' : 'hidden'} />
      <UserButton />
    </div>
  );
}

const mapStateToProps = state => ({
  isBackButton: state.toolbar.isBackButton,
  isSearchTextBox: state.toolbar.isSearchTextBox
})

export default connect(mapStateToProps)(Toolbar);
