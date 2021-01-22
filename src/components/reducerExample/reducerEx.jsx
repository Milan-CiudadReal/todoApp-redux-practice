import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { UserContext } from './index';
import React, { useContext, useReducer } from 'react';

// import UserForm from './components/userForm/userForm'
// import Github from './components/getData/github';

const initialState = {
	count: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1 };
		case 'decrement':
			return { count: state.count - 1 };
		case 'reset':
			return initialState;
		default:
			return initialState;
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = useContext(UserContext);
	return (
		<div>
			<div>
				Count: {state.count}
				<br />
				<Button onClick={() => dispatch({ type: 'increment' })}>
					increment
				</Button>
				<Button onClick={() => dispatch({ type: 'decrement' })}>
					decrement
				</Button>
				<Button onClick={() => dispatch({ type: 'reset' })}>
					reset
				</Button>
			</div>
			<div>Received, {value}</div>
		</div>
	);
}

export default App;
