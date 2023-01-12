import './Search.css';
import { Form, Button } from 'react-bootstrap';

function Search() {
    return (
        <Form className='formContainer'>
            <Form.Label className='h2'>Search an anime</Form.Label>
            <Form.Group className="inputContainer" xs={12} controlId="search">
                <Form.Control className='input' type="input" placeholder="Sagrada Reset" />
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form.Group>
        </Form>
    )
}

export default Search