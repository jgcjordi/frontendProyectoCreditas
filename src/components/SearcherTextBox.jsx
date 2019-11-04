import React from 'react';
import { connect } from 'react-redux';
import { newPhoneSearchText} from '../actions/toolbar';



function SearcherTextBox(props) {

    const handleKeyDown = () => { console.log("Hola") }
    const onBtnSearchClicked = () => { console.log(props.phoneSearchText) }


    return (
        <div className="SearcherTextBox">
            <input
                className="textBoxSearch"
                type="text"
                placeholder="Mobile Phone"
                onChange={(ev) => props.newPhoneSearchText(ev.target.value)}
                onKeyDown={handleKeyDown}
                value={props.phoneSearchText} 
                />
            <button className="buttonSearch" onClick={onBtnSearchClicked}>Search</button>
            
        </div>
    );
}


const mapStateToProps = state => ({
    phoneSearchText: state.toolbar.phoneSearchText
})

const mapDispatchToProps = dispatch => ({
    newPhoneSearchText: (phoneSearchText) => dispatch(newPhoneSearchText(phoneSearchText))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearcherTextBox);