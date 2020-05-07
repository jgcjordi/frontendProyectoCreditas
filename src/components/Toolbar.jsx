import React from 'react';
import BackButton from './BackButton';
import SearcherTextBox from './SearcherTextBox';
import UserButton from './UserButton';
import { connect } from 'react-redux';
import './Toolbar.scss';
import PhoneBear from '../assets/images/phoneBear.jpg'
import ApiPhoneService from '../services/ApiPhoneService';




function Toolbar(props) {

  return (
    <div className="Toolbar">
      <BackButton visibility={props.isBackButton ? 'visible' : 'hidden'} />
      <a className="linkLogo" href={ApiPhoneService.HOME_URL}>
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
