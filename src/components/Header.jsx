//import './Header.css';
import {Container, Row, Col} from 'react-bootstrap';


function Header() {
   return (
       <Container fluid className='bg-primary'>
           <Row>
                <Col>
                    <h1>Hi Header</h1>
                </Col>
           </Row>
       </Container>
   )
}

export default Header