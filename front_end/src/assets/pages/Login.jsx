import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import Register from './Register.jsx';
import Badge from 'react-bootstrap/Badge';

const Login = () => {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    username: '',
    password: '',
  });
  const [logMsg, setLogMsg] = useState(false);
  const [err, setErr] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormLogin((prevFormLogin) => ({
      ...prevFormLogin,
      [name]: value,
    }));
    console.log(formLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    
  
    const web_url_login = 'http://localhost:5000/login';
    try {
      const response = await fetch(web_url_login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formLogin),
      });
      const loginUser = await response.json();
      if (loginUser.code === 'success') {
        localStorage.setItem('loginUser', JSON.stringify(loginUser.user));
        setErr(false);
        setLogMsg(true);
       setTimeout(()=> {
        navigate('/');
       },2000);
      } else {
        setErr(true);
      }
    } catch (error) {
      console.log(error);
       setErr(true);
    }
  };
  
  


  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col sm={6}>
          <Card border="success border-0">
            <Card.Body className="bg-success rounded-4">
              <Card.Title className="text-center mb-4 fs-1">Login</Card.Title>
              <Form onSubmit={handleLogin}>
            {logMsg && <Badge bg="warning" className='fs-5 mb-4'>Login Successful</Badge>}
           {err &&  <Badge bg="danger" className='fs-5 mb-4'>Invalid input</Badge>}
                <Form.Group className="mb-5" controlId="formUsername">
                  <Form.Control required type="text" placeholder="Username" value={formLogin.username} name="username" onChange={handleLoginChange} />
                </Form.Group>
                <Form.Group className="mb-5" controlId="formPassword">
                  <Form.Control required type="password" placeholder="Password" value={formLogin.password} name="password" onChange={handleLoginChange} />
                </Form.Group>
                <Row className="mt-2 mb-6 justify-content-center">
                  <Button variant="info" className="col-sm-6 mb-5 mx-auto" type='submit'>
                    Log In
                  </Button>
                  <Register />
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
