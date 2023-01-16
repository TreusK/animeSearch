import './Search.css';
import { Form, Button } from 'react-bootstrap';

import {useState} from 'react';

function Search({handleSearch}) {
    const [input, setInput] = useState('');

    function handleChange(e) {
        setInput(e.target.value);
    }

    return (
        <Form className='formContainer'>
            <Form.Label className='h2'>Search an anime</Form.Label>
            <Form.Group className="inputContainer" xs={12} controlId="search">
                <Form.Control className='input' type="input" placeholder="Sagrada Reset" value={input} onChange={(e) => handleChange(e)}/>
                <Button variant="primary" type="submit" onClick={(e) => handleSearch(e, input)}>
                    Search
                </Button>
            </Form.Group>
        </Form>
    )
}

export default Search