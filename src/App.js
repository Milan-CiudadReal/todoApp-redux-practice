import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useReducer } from 'react';
import TodoList from './components/todoList/todoList';
// import UserForm from './components/userForm/userForm'
// import Github from './components/getData/github';

const todosInitialState = {
	todos: [],
};

function todosReducer(state, action) {
	switch (action.type) {
		case 'get':
			return { ...state, todos: action.payload };
		case 'edit':
			const updateTodo = { ...action.payload };
			const updatedToDoIndex = state.todos.findIndex(
				t => t.id === action.payload.id
			);
			const updatedToDos = [
				...state.todos.slice(0, updatedToDoIndex),
				updateTodo,
				...state.todos.slice(updatedToDoIndex + 1),
			];
			return { ...state, todos: updatedToDos };

		case 'delete':
			const filteredTodoState = state.todos.filter(
				todo => todo.id !== action.payload.id
			);
			return { ...state, todos: filteredTodoState };
		case 'add':
			const addedTodos = [...state.todos, action.payload];
			return {
				...state,
				todos: addedTodos,
			};
		default:
			return todosInitialState;
	}
}

export const TodosContext = React.createContext();

function App() {
	const [state, dispatch] = useReducer(todosReducer, todosInitialState);
	return (
		<TodosContext.Provider value={{ state, dispatch }}>
			<TodoList />
		</TodosContext.Provider>
	);
}

export default App;
