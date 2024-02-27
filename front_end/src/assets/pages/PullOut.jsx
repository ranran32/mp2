import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import Navigation from './Nav';
import apiRequest from './apiRequest';
import Badge from 'react-bootstrap/Badge';

const PullOut = () => {
  const [defPrinter, setDefPrinter]= useState([]);
  const [show,setShow]= useState(false);
  const [printerID, setPrinterID] = useState('');
  const [selectedPrinter,setSelectedPrinter]= useState('');


    const handleClose= ()=> {
      setShow(false);
    }

  const getPullOut = async () => {
  const response= await fetch ('http://localhost:5000/all-pullOut');
  const data= await response.json();
  console.log(data);
  setDefPrinter(data);

  }

  useEffect(()=> {
    console.log(defPrinter);
    getPullOut();
  },[])


  const handleRebuild=async (id)=> {
    const response= await fetch ('http://localhost:5000/all-pullOut/' + id) ;
    const data= await response.json();
    console.log(data)
    setSelectedPrinter(data);
    setPrinterID(id);
    console.log(selectedPrinter);
    setShow(true);
  }
 
  const handleMoveRebuild= async () => {
    const reqObj= {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedPrinter)
    }
    const data= await apiRequest ('http://localhost:5000/pushRebuild/' + printerID, reqObj);
    if (data.code=== 'success') {
      console.log('pushed!')
    }else {
      console.log('failed pushing code');
    }
    setSelectedPrinter('');
    setShow(false);
    getPullOut();
  }


  
  return (
    <div>
    <Container fluid className='bg-success'>
      <Navigation/>
    </Container>
    <Container sm={6}>
      <Badge bg="secondary" className='fs-4 mb-2'>
        Pull-outs
      </Badge>
      <Accordion defaultActiveKey="0">
  {defPrinter.length === 0? (<p> No pull outs</p>): defPrinter.map((item) => (
    item.id && (
      <Accordion.Item eventKey={item.id.toString()} key={item.id}>
        <Accordion.Header>{item.brand}</Accordion.Header>
        <Accordion.Body>
          <p>MODEL: {item.model}</p>
          <p>SERIAL: {item.serial}</p>
          <p>REMARKS: {item.remarks}</p>
          <Button variant='success' onClick={()=> handleRebuild(item.id)}>REBUILD</Button>
        </Accordion.Body>
      </Accordion.Item>
    )
  ))}
</Accordion>
    </Container>









    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Move to rebuild</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Brand</Form.Label>
          <Form.Control required readOnly type="text" value={selectedPrinter.brand}  placeholder="Enter Brand Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Model</Form.Label>
          <Form.Control required readOnly type="text" value={selectedPrinter.model} placeholder="Enter Model Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Serial</Form.Label>
          <Form.Control required readOnly type="text" value={selectedPrinter.serial}  placeholder="Enter Serial Name"  />
        </Form.Group>
      
        </Form>
        
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleMoveRebuild} >
          Rebuild
          </Button>
        </Modal.Footer>
      </Modal>
        






      
    </div>
  )
}

export default PullOut
