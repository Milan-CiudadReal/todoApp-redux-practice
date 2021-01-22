import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

function UserForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [checkStatus, setCheckStatus] = useState(false)

	const handleCheck = e => {
		const { checked } = e.target
		setCheckStatus(checked)
	}

	const handleSubmit = e => {
		e.preventDefault()
		var emailValid = false
		if (email.length === 0) {
			setEmailError('Email is required')
		} else if (email.length < 6) {
			setEmailError('Email should be a minimum of 6 characters')
		} else if (email.indexOf(' ') >= 0) {
			setEmailError('Email cannot contain spaces')
		} else {
			setEmailError('')
			emailValid = true
		}
		//password
		var passwordValid = false
		if (password.length < 6) {
			setPasswordError('Password must be at least 6 characters')
		} else if (password.indexOf(' ') >= 0) {
			setPasswordError('Password cannot contain spaces')
		} else if (password.length === 0) {
			setPasswordError('Please enter a password to login')
		} else {
			setPasswordError('')
			passwordValid = true
		}

		if (emailValid && passwordValid) {
			alert('Email: ' + email + '\nPassword: ' + password)
			setEmail('')
			setPassword('')
		}
	}

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				{emailError.length > 0 && (
					<Alert variant="danger">{emailError}</Alert>
				)}
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</Form.Group>
				{passwordError.length > 0 && (
					<Alert variant="danger">{passwordError}</Alert>
				)}
				<Form.Check
					type="checkbox"
					id="autoSizingCheck"
					className="mb-2"
					label="Remember me"
					onClick={handleCheck}
				/>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			Email Entered: {email}
			<br />
			Password Entered: {password}
			<br />
			Check Status: {checkStatus.toString()}
		</div>
	)
}

export default UserForm
