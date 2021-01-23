import React, { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../App';
import { Table, Button, Form } from 'react-bootstrap';
import useApi from '../api/useApi';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function ToDoList() {
	//receive state and dispatch from index
	const { state, dispatch } = useContext(TodosContext);
	const [todoText, setTodoText] = useState('');
	const [editMode, setEditMode] = useState(false);
	const [editTodo, setEditTodo] = useState(null);
	const buttonTitle = editMode ? 'Edit' : 'Add';

	const endpoint = 'http://localhost:3000/todos/';
	const savedTodos = useApi(endpoint);

	useEffect(() => {
		dispatch({ type: 'get', payload: savedTodos });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [savedTodos]);

	const handleSubmit = async e => {
		e.preventDefault();
		if (editMode) {
			await axios.patch(endpoint + editTodo.id, { text: todoText });
			dispatch({
				type: 'edit',
				payload: { ...editTodo, text: todoText },
			});
			setEditMode(false);
			setEditTodo(null);
		} else {
			const newToDo = { id: uuidv4(), text: todoText };
			await axios.post(endpoint, newToDo);
			dispatch({ type: 'add', payload: newToDo });
		}

		setTodoText('');
	};
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Control
						type="text"
						placeholder="Enter To Do"
						onChange={e => setTodoText(e.target.value)}
						value={todoText}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					{buttonTitle}
				</Button>
			</Form>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>To Do</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{state.todos.map(todo => (
						<tr key={todo.id}>
							<td>{todo.text}</td>
							<td
								onClick={() => {
									setTodoText(todoText);
									setEditMode(true);
									setEditTodo(todo);
								}}
							>
								<Button variant="link">Edit</Button>
							</td>
							<td
								onClick={async () => {
									await axios.delete(endpoint + todo.id);
									dispatch({ type: 'delete', payload: todo });
								}}
							>
								<Button variant="link">Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
export default ToDoList;
