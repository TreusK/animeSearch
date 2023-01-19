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
            <h3>Simple jikan api consuming anime searching app</h3>
            <p>Have you ever wanted to search for an anime series, but didn't feel like using google and somehow ended in here? Fret not, for you can still achieve your goal!</p>
            <p>Just write the name of the anime you're looking for and let the magic happen! (after a few seconds)</p>
            <p>You can also click on the results to read a synopsis and stuff</p>
            <Form className='formContainer'>
                    <Form.Group className="inputContainer">
                        <Form.Control className='input' type="input" placeholder="Sagrada Reset" value={input} onChange={(e) => handleChange(e)}/>
                        <Button type="submit" onClick={(e) => handleSearch(e, input)}>
                            Search <BiSearch />
                        </Button>
                    </Form.Group>
            </Form>
        </div>
    )
}

export default Search