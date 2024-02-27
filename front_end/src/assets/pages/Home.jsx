import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './Nav';
import HomeCard from './HomeCard';
import Homebar from './Homebar';

const Home = () => {
  const navigate = useNavigate();
  const [loginUserObj, setLoginUserObj] = useState(null);

  useEffect(() => {
    const loginUser = localStorage.getItem('loginUser');
    if (!loginUser) {
      console.log('User not logged in');
      navigate('/login');
      return;
    }
  }, [navigate]);
  
  return (
    <div>
      <Container fluid className='bg-success'>
        <Navigation/>
      </Container>
      
      <Row className='ms-2'>
        <HomeCard/>
      </Row>

      <Row className='mt-5 text-center'>
        <h2 className='fs-2'>Rebuild Goal Progress</h2>
        <p>Annual Goal: 20 printers</p>
      </Row>

      <Row className='mt-2 justify-content-center'>
        <Col sm={8}>
          <Homebar/>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
