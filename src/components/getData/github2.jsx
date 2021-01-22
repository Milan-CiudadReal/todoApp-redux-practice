import React, { useEffect, useState } from 'react';
import axios from 'axios'; // npm install axios
import ReactLoading from 'react-loading';
import { Media } from 'react-bootstrap';

function GitHub() {
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	//     const [error, setError] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const res = await axios.get(
				`https://api.github.com/search/users?q=${searchTerm}`
			);
			setData(res.data.items);
			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}

		const handleSubmit = event => {
			event.preventDefault();
			setIsLoading(true);
			getData();
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
						onChange={event => setSearchTerm(event.target.value)}
					/>
					<button type="submit">Search</button>
				</form>
				<h3>GitHub Users Results</h3>
				{isLoading && (
					<ReactLoading type="spinningBubbles" color="#444" />
				)}
				{listUsers}
				{/* {error && <div className="text-red-font-bold">{error.message}</div>}                                                                                                    */}
			</div>
		);
	};
}
export default GitHub;
