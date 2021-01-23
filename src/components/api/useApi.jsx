import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = endpoint => {
	const [data, setData] = useState([]);

	//to call data when component is mounted
	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getData = async () => {
		const response = await axios.get(endpoint);
		setData(response.data);
	};

	return data;
};

export default useApi;
