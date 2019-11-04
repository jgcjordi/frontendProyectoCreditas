import { combineReducers } from 'redux'

//Dependencias de Reducers
import toolbar from './toolbar'
import phones from './phones'


//Exportamos CombineReducers donde alojaremos todos los reducers
export default combineReducers({
    toolbar,
    phones
});