import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench, faReply,faTruckPickup, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './nav.css';

function OffcanvasExample() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('loginUser');
    navigate('/login');
  }
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3" id='nav'>
          <Container fluid>
          <Link to={'/'}>
          <Navbar.Brand>
              <h1 className='text-light fs-3'>ProPrintControl</h1>
            </Navbar.Brand>
          </Link>
            <Navbar.Toggle className='bg-warning' aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Main Navigation
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center">
                  <Nav.Link as={Link} to="/" className="navs">
                    <FontAwesomeIcon icon={faHome} className="icon" />
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/deployed" className="navs">
                  <FontAwesomeIcon icon={faTruckPickup} className="icon" />
                    Deployed
                  </Nav.Link>
                  <Nav.Link as={Link} to="/pull-out" className="navs">
                  <FontAwesomeIcon icon={faReply} className="icon" />
                    Pull-outs
                  </Nav.Link>
                  <Nav.Link as={Link} to="/rebuild" className="navs">
                  <FontAwesomeIcon icon={faWrench} className="icon" />
                    Rebuild
                  </Nav.Link>
                  <Nav.Link>
                    <button className="btn btn-success" onClick={logout}>
                      <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                      Sign out
                    </button>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
