import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

// import UserForm from './components/userForm/userForm'
// import Github from './components/getData/github';

function App(props) {
	return <Navbar username={props.username} />;
}

export default App;
