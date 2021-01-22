import React, { useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Media, Button } from 'react-bootstrap';

function Github() {
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);
		getData();
		console.log(searchTerm);
	};

	// useEffect(() => {
	// 	getData();
	// }, []);

	const getData = async () => {
		try {
			const res = await axios.get(
				`https://api.github.com/search/users?q=${searchTerm} `
			);

			console.log(res.data.items);
			setData(res.data.items);
			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const listUsers = data.map(user => (
		<Media key={user.id}>
			<a href={user.html_url}>
				<img
					width={64}
					height={64}
					className="mr-3"
					src={user.avatar_url}
					alt="Generic placeholder"
				/>
			</a>
			<Media.Body>
				<h5>Login: {user.login}</h5>
				<p>Id: {user.id}</p>
			</Media.Body>
		</Media>
	));

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</form>
			<h3>Github Users Results</h3>
			{isLoading && <ReactLoading type="spinningBubbles" color="#444" />}
			{listUsers}
		</div>
	);
}

export default Github;
