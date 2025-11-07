// src/components/Login.jsx
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap'; 

const Login = () => {
    // You would add state and handleSubmit logic here
    return (
        <Container style={{ maxWidth: '400px' }} className="mt-5 p-4 border rounded shadow-sm">
            <h3 className="text-center mb-4">Login to Fenochem</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                
                {/* Submit Button */}
                <Button 
                    variant="success" // A common variant for a successful action like login
                    type="submit"    // Make it a submit button
                    className="w-100" // w-100 makes the button full width
                >
                    Log In
                </Button>
            </Form>
        </Container>
    );
};

export default Login;