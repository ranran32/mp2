import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate= useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [passwordStr, setPasswordStr] = useState(false);
  const [passwordWk, setPasswordWk] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userExist, setUserExist] = useState('');
  const [regMsg, setRegMsg]= useState ('Sign Up');
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === 'password') {
      if (value.length > 5) {
        setPasswordStr(true);
        setPasswordWk(false);
      } else {
        setPasswordWk(true);
        setPasswordStr(false);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.username === '' || formData.password === '' || formData.email === '') {
      setErrorMsg('Form must be filled out!');
    } else if (passwordWk) {
      setErrorMsg('Invalid Password');
    } else {
      const web_url = 'http://localhost:5000/register';
      try {
        const response = await fetch(web_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const userData = await response.json();
        if (userData.code === 'success') {
          setRegMsg('Registration Successful')
          setTimeout(()=> {
            setShowModal(false);
            navigate('/');
            setRegMsg('Sign Up');
            setFormData('')
          },2000);
          localStorage.setItem('loginUser', JSON.stringify(userData.user));
        } else {
          setUserExist('User already Exist')
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <Button
          variant="dark"
          className="col-sm-6"
          onClick={() => setShowModal(true)}
        >
          Sign Up
        </Button>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}  
        centered
        sm={12}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">{regMsg}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignUp}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            { passwordWk && <p className='text-danger'> Password should be atleast 6 characters</p>}
            { passwordStr && <p className='text-success'> Password is Strong</p>}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
                className='mb-5'
              />
            </Form.Group>

            <Button variant="info" type="submit">
              Register
            </Button>
            <p className='text-danger'>{errorMsg}</p>
            <p className='text-danger'> {userExist}</p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
