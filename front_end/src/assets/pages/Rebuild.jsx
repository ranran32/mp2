import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import Navigation from './Nav';
import apiRequest from './apiRequest';
import Badge from 'react-bootstrap/Badge';

const Rebuild = () => {
    const [rebuild,setRebuilds]= useState([]);
    const[show, setShow]= useState(false);
    const [name, setName]= useState('');
    const [brand, setBrand]= useState('');
    const [model, setModel]= useState('');
    const [serial, setSerial]= useState('');
    const [selectedPrinter,setSelectedPrinter]= useState('');


    const handleClose= ()=> {
      setShow(false);
    }

    const getallRebuild= async () => {
        try {
            const response= await fetch ('http://localhost:5000/all-rebuild');
            const data=  await response.json();
            console.log(data);
            setRebuilds(data);

        }catch (error) {
                console.log(error);
        }
    }

    useEffect(()=> {
        getallRebuild();
    },[]);

    const handleRebuild = async (id) =>{
      const response= await fetch ('http://localhost:5000/all-rebuild/'+id);
      const data= await response.json();
      setSelectedPrinter(id);
      console.log(selectedPrinter);
      setBrand(data.brand);
      setModel(data.model);
      setSerial(data.serial);
      setShow(true);
    }

    const confirmDeploy= async()=> {
      const objReq= {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          name:name,
          brand: brand,
          model:model,
          serial:serial
        })
      }
      const data= await apiRequest ('http://localhost:5000/pushDeployed/'+ selectedPrinter,objReq);
      
      if(data.code === 'success') {
        console.log(data.msg);
        setName('')
        setBrand('');
        setModel('');
        setSerial('');
        getallRebuild();
        setShow(false);
        console.log(data.client);
        console.log(data.client.name);
      } else {
        console.log('erorr deploying')
      }
    }

  return (
    <div>
     <Container fluid className='bg-success'>
      <Navigation/>
    </Container>
  <Container sm={6}>
  <Badge bg="secondary" className='fs-4 mb-2'>
        Rebuilds
      </Badge>

      <Accordion defaultActiveKey="0">
      {rebuild.length === 0? (<p>No rebuilds</p>) : rebuild.map((item)=> (
        <Accordion.Item  eventKey={item.id.toString()} key={item.id}>
        <Accordion.Header>{item.brand}</Accordion.Header>
        <Accordion.Body>
        <p>MODEL: {item.model}</p>
          <p>SERIAL: {item.serial}</p>
          <Button onClick={()=> handleRebuild(item.id)}> Deploy</Button>
        </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </Container>





  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deploy a printer</Modal.Title>
        </Modal.Header>
        <Modal.Body> 

        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" value={name} onChange={ (e)=>{ setName(e.target.value) }} placeholder="Enter Brand Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Brand</Form.Label>
          <Form.Control required readOnly type="text" value={brand} onChange={ (e)=>{ setBrand(e.target.value) }} placeholder="Enter Brand Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Model</Form.Label>
          <Form.Control required readOnly type="text" value={model} onChange={ (e)=>{ setModel(e.target.value) }} placeholder="Enter Model Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Serial</Form.Label>
          <Form.Control required readOnly type="text" value={serial} onChange={ (e)=>{ setSerial(e.target.value) }} placeholder="Enter Serial Name"  />
        </Form.Group>
      
        </Form>
        
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={confirmDeploy}>
        Deploy
          </Button>
        </Modal.Footer>
      </Modal>
      



    </div>
  )
}

export default Rebuild
