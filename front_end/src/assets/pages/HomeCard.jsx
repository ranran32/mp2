import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function CardNav() {
    const navigate = useNavigate();
    return (
        <Row className='mt-4'>
            <Col sm={4}>
                <Card style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Title>Deployed Printers</Card.Title>
                        <Card.Text>
                        Deployed printers represent printing devices strategically stationed at diverse client premises, serving to fulfill their specific printing needs.
                        </Card.Text>
                       <Link to="/deployed"> <Button variant="warning">Deployed</Button></Link>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={4}>
                <Card style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Title>Printers Pulled Out</Card.Title>
                        <Card.Text>
                            Printers pulled out from clients are transported to the facility for inspection, addressing defects or concluding contracts.
                        </Card.Text>
                        <Link to="/pull-out"> <Button variant="warning">Pull-outs</Button></Link>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={4}>
                <Card style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Title>Rebuilt Printers</Card.Title>
                        <Card.Text>
                            Rebuilt printers, sourced from pulled-out inventory, undergo thorough cleaning and part replacement to restore optimal functionality.
                        </Card.Text>
                       <Link to={"/rebuild"}> <Button variant="warning">Rebuild</Button></Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default CardNav;
