import './Search.css';
import {useState} from 'react';
import { BiSearch } from 'react-icons/bi';
import {Form, Button} from 'react-bootstrap';


function Search({handleSearch}) {
    const [input, setInput] = useState('');

    function handleChange(e) {
        setInput(e.target.value);
    }

    return (
        <div className='Search'>
            <h2>Search</h2>
            <Form className='formContainer'>
                    <Form.Group className="inputContainer">
                        <Form.Control className='input' type="input" placeholder="Sagrada Reset" value={input} onChange={(e) => handleChange(e)}/>
                        <Button type="submit" onClick={(e) => handleSearch(e, input)}>
                            <BiSearch />
                        </Button>
                    </Form.Group>
            </Form>
        </div>
    )
}

export default Search