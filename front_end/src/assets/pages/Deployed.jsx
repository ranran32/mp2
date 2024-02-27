import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import Navigation from './Nav';
import apiRequest from './apiRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



const renderEdit = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Edit
  </Tooltip> );

const renderDelete = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Delete
  </Tooltip> );

const renderPullOut = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Pull-Out
  </Tooltip> );

const Deployed = () => {
    const [allClient, setAllClient] = useState([]);
    const [name, setName] = useState ('');
    const [brand, setBrand] = useState ('');
    const [model, setModel] = useState ('');
    const [serial, setSerial] = useState ('');
    const [show, setShow] = useState(false);
    const [printerShow, setPrinterShow]= useState(false);
    const [updateShow, setUpdateShow]= useState(false);
    const [selectedClient,setSelectedClient] = useState('');
    const [printerIndex, setPrinterIndex] = useState('');
    const [deleteShow, setDeleteshow] = useState(false);
    const [pullOutShow,setPullOutShow] = useState('');
    const [remarks,setRemarks]= useState('');
   

const handleClose = () => {
        setShow(false);
        setPrinterShow(false);
        setUpdateShow(false);
        setDeleteshow(false);
        setPullOutShow(false);
        setBrand('');
        setModel('');
        setSerial('');
    };
    
const handleAdd= () => {
    setShow(true);
}
const handleSave = async (e) => {
    e.preventDefault(); 
    try {
      const objReq = {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json', 
        },
        body: JSON.stringify({
          name: name,
          brand: brand,
          model: model,
          serial: serial
        })
      };
  
      const data = await apiRequest('http://localhost:5000/add-client', objReq);
      console.log(data);
      
      if (data.code === 'success') {
        console.log('added');
        getClient(); 
      } else {
        console.log('error adding');
      }
      
      setShow(false);
    } catch (error) {
      console.error('Error occurred while adding client:', error);
    }
  }
  

const handleAddPrinter = async (id) => {
    const response = await fetch('http://localhost:5000/all-client/'+id);
    const data = await response.json();
    setSelectedClient(id);
    setPrinterShow(true);
    console.log(selectedClient);
    console.log(printerShow);
}

const handleSavePrinter= async () => {
    const objReq= {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            brand: brand,
            model: model,
            serial: serial
        })
    }
    const data = await apiRequest(`http://localhost:5000/add-printer/`+ selectedClient, objReq);
    console.log(data);

    if (data.code === 'success') {
        console.log('Printer added');
        getClient();
       setBrand('');
       setModel('');
       setSerial('');
      } else {
        console.log('Error adding printer');
      }
      setPrinterShow(false);
}

const  handleUpdatePrinter= async (id, index) => {
    const response = await fetch('http://localhost:5000/all-client/' + id + '/' + index);
    const data = await response.json()
    console.log(data);
    setSelectedClient(id);
    setPrinterIndex(index);
    setBrand(data.brand)
    setModel(data.model)
    setSerial(data.serial)
    console.log(selectedClient);
    console.log(printerIndex);
    setUpdateShow(true);
}

const handleSaveChanges= async () => {
    const objReq= {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            brand: brand,
            model: model,
            serial: serial
        })
    }
  const data= await apiRequest('http://localhost:5000/edit-printer/' + selectedClient + '/' + printerIndex, objReq);
  if(data.code === "success"){
    console.log('Updated! ');
  } else {
    console.log('error editing');
  }
  getClient();
  setUpdateShow(false);
  setBrand('');
  setModel('');
  setSerial('');
}

const handleDelete = (id,index)=> {
  setSelectedClient(id);
  setPrinterIndex(index);
  setDeleteshow(true);
  console.log(selectedClient);
  console.log(printerIndex);
}

const handleConfirmDelete = async () => {
  console.log("Selected Client:", selectedClient);
  console.log("Printer Index:", printerIndex);
  
  try {
    const objReq = {
      method: 'DELETE'
    };
    const data= await apiRequest('http://localhost:5000/delete-printer/' + selectedClient + '/' + printerIndex, objReq);
    if (data.code === 'success') {
      console.log(data.msg);
    } else {
      console.log('Deletion failed:', data); 
    }

    setDeleteshow(false);
    getClient();
  } catch (error) {
    console.error('Error occurred during deletion:', error);
  }
};



const getClient = async () => {
    const response = await fetch ('http://localhost:5000/all-client');
    const data = await response.json();
    console.log (data);
    setAllClient(data);
}
    useEffect(()=> {
        console.log("allClient:", allClient);
        getClient();
    }, [])



    const handlePullOut = async(id, index)=> {
        const response = await fetch('http://localhost:5000/all-client/' + id + '/' + index);
        const data = await response.json()
        console.log(data);
        setSelectedClient(id);
        setPrinterIndex(index);
        setBrand(data.brand);
        setModel(data.model);
        setSerial(data.serial);
        console.log(selectedClient);
        console.log(printerIndex);
        setPullOutShow(true);
    }
 
    const handleConfirmPullOut = async () => {
      const objReq= {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            brand: brand,
            model: model,
            serial: serial,
            remarks: remarks
        })
    }
    const data= await apiRequest('http://localhost:5000/pushPull-out/' + selectedClient + '/' + printerIndex, objReq);
  if(data.code === "success"){
    console.log('Pushed! ');
    console.log(data.code);
  } else {
    console.log('error');
  }
    getClient();
    setPullOutShow(false);
    setBrand('');
    setModel('');
    setSerial('');
    }

  return (
    <div>
        <Container fluid className='bg-success' >
    <Navigation/>
        </Container>
    <Container sm={6}>
    <Button className='mb-2' onClick={handleAdd}> 
            Add NewClient
        </Button>
    


        <Accordion defaultActiveKey="0">
     {allClient.map((item)=> (
         <Accordion.Item eventKey={item.id.toString()} key={item.id}>
        <Accordion.Header > {item.name} </Accordion.Header>
         <Accordion.Body>
        {item.printer.map((printer,index)=>(
               <div key={index}>
               <p>Printer {index + 1}:</p>
               <p>Brand: {printer.brand}</p>
               <p>Model: {printer.model}</p>
               <p>Serial: {printer.serial}</p>

               <OverlayTrigger
               placement="right"
               delay={{ show: 100, hide: 400 }}
              overlay={renderEdit}
                >
              <Button className='mb-2' variant="secondary" onClick={ ()=> handleUpdatePrinter(item.id, index)}>
              <FontAwesomeIcon icon={faEdit} />
              </Button>
             </OverlayTrigger>
              {' '}
              <OverlayTrigger
               placement="right"
               delay={{ show: 100, hide: 400 }}
              overlay={renderDelete}
               >
              <Button className='mb-2' variant="danger" onClick={ ()=> handleDelete(item.id, index)}>
              <FontAwesomeIcon icon={faTrash} />
              </Button>
             </OverlayTrigger>
             {' '}
             <OverlayTrigger
               placement="right"
               delay={{ show: 100, hide: 400 }}
              overlay={renderPullOut}
               >
              <Button className='mb-2' variant="warning" onClick={ ()=> handlePullOut(item.id, index)}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </Button>
             </OverlayTrigger>
           </div>
        ))}
         <Button className='mb-2' variant='success' onClick={ ()=> handleAddPrinter(item.id)}> 
            Add New Printer
        </Button>
         </Accordion.Body>
       </Accordion.Item>
     ))}
    </Accordion>
  
        
              
    </Container>

             {/* ADD CLIENT */}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" value={name} onChange={ (e)=>{ setName(e.target.value) }} placeholder="Enter Client Name"  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Brand</Form.Label>
          <Form.Control required type="text" value={brand} onChange={ (e)=>{ setBrand(e.target.value) }} placeholder="Enter Brand Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Model</Form.Label>
          <Form.Control required type="text" value={model} onChange={ (e)=>{ setModel(e.target.value) }} placeholder="Enter Model Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Serial</Form.Label>
          <Form.Control required type="text" value={serial} onChange={ (e)=>{ setSerial(e.target.value) }} placeholder="Enter Serial Name"  />
        </Form.Group>
      
        </Form>
        
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSave}>
          Add
          </Button>
        </Modal.Footer>
      </Modal>
        





            {/* ADD PRINTER */}
      <Modal show={printerShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding New Printer</Modal.Title>
        </Modal.Header>
        <Modal.Body> 

        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Brand</Form.Label>
          <Form.Control required type="text" value={brand} onChange={ (e)=>{ setBrand(e.target.value) }} placeholder="Enter Brand Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Model</Form.Label>
          <Form.Control required type="text" value={model} onChange={ (e)=>{ setModel(e.target.value) }} placeholder="Enter Model Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Serial</Form.Label>
          <Form.Control required type="text" value={serial} onChange={ (e)=>{ setSerial(e.target.value) }} placeholder="Enter Serial Name"  />
        </Form.Group>
      
        </Form>
        
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSavePrinter}>
          Add printer
          </Button>
        </Modal.Footer>
      </Modal>
      




        {/* UPDATE PRINTER */}
        <Modal show={updateShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Printer</Modal.Title>
        </Modal.Header>
        <Modal.Body> 

        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Brand</Form.Label>
          <Form.Control required type="text" value={brand} onChange={ (e)=>{ setBrand(e.target.value) }} placeholder="Enter Brand Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Model</Form.Label>
          <Form.Control required type="text" value={model} onChange={ (e)=>{ setModel(e.target.value) }} placeholder="Enter Model Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Serial</Form.Label>
          <Form.Control required type="text" value={serial} onChange={ (e)=>{ setSerial(e.target.value) }} placeholder="Enter Serial Name"  />
        </Form.Group>
      
        </Form>
        
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSaveChanges}>
          Update printer
          </Button>
        </Modal.Footer>
      </Modal>
      


          {/* DELETE PRINTER */}
      <Modal show={deleteShow} onHide={handleClose} centered>
        <Modal.Body> 

      <p className='fs-4'>Are u sure to delete this Printer?</p>
        
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="danger" onClick={handleConfirmDelete}>
          Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      

            {/* PULL-OUT PRINTER */}
      <Modal show={pullOutShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pull-Out Printer</Modal.Title>
        </Modal.Header>
        <Modal.Body> 

        <Form>
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Remarks</Form.Label>
          <textarea className="form-control" required value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Enter Remarks" rows="3"></textarea>
        </Form.Group>
      
        </Form>
        
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleConfirmPullOut}>
          Pull-out printer
          </Button>
        </Modal.Footer>
      </Modal>
      



    </div>
  )
}

export default Deployed
