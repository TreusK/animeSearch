import './Header.css';
import { Container, Row, Col } from 'react-bootstrap';

function Header() {
    return (
        <Row>
            <Col>
                <div className='header'>
                    <h2>Hi header</h2>
                </div>
            </Col>
        </Row>
    )
}

export default Header