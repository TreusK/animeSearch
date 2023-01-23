import './Search.css';
import {useState} from 'react';
import { BiSearch } from 'react-icons/bi';
import {Form, Button, Col, Row} from 'react-bootstrap';

//Years array to fill form option
let years = [];
let currentYear = new Date().getFullYear();
for(let i=1960; i<=currentYear; i++) {
    years.unshift(i);
}

function Search({handleSearch}) {
    const [input, setInput] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleGenreChange(e) {
        setGenre(e.target.value);
    }

    function handleYearChange(e) {
        setYear(e.target.value);
    }


    function getFormData(e) {
        e.preventDefault();
        let formData = {
            input,
            genre,
            year,
            currentPage: '1',
        };
        handleSearch(formData);
    }

    return (
        <div className='Search'>
            <h3>Simple jikan api consuming anime searching app</h3>
            <p>Have you ever wanted to search for an anime series, but didn't feel like using google and somehow ended in here? Fret not, for you can still achieve your goal!</p>
            <p>Just write the name of the anime you're looking for and let the magic happen! (after a few seconds)</p>
            <p>You can also click on the results to read a synopsis and stuff</p>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={12} className='mb-3'>
                        <Form.Control type="input" placeholder='by Name' value={input} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} sm={6} className='mb-3 labelContainer'>
                        <Form.Label>by Genre</Form.Label>
                        <Form.Select value={genre} onChange={handleGenreChange}>
                            <option value=''>any</option>
                            <option value="2">Adventure</option>
                            <option value="4">Comedy</option>
                            <option value="39">Detective</option>
                            <option value="8">Drama</option>
                            <option value="10">Fantasy</option>
                            <option value="14">Horror</option>
                            <option value="62">Isekai</option>
                            <option value="7">Mystery</option>
                            <option value="27">Shoune</option>
                            <option value="36">Slice of Life</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} sm={6} className='mb-3 labelContainer'>
                        <Form.Label>by Year</Form.Label>
                        <Form.Select value={year} onChange={handleYearChange}>
                            <option value=''>any</option>
                            {years.map(number => <option key={number} value={number}>{number}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Button type="submit" onClick={getFormData}>
                        Search <BiSearch />
                </Button>      
            </Form>
        </div>
    )
}

export default Search
