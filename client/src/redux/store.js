import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'; // Tu archivo del reductor raíz

const store = createStore(reducer, applyMiddleware(thunk));

export default store