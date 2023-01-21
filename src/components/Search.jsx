import './Search.css';
import {useState} from 'react';
import { BiSearch } from 'react-icons/bi';
import {Form, Button} from 'react-bootstrap';

//Years array to fill form option
let years = [];
for(let i=1960; i<=2023; i++) {
    years.unshift(i);
}

function Search({handleSearch}) {
    const [input, setInput] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [airing, setAiring] = useState(false);

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleGenreChange(e) {
        setGenre(e.target.value);
    }

    function handleYearChange(e) {
        setYear(e.target.value);
    }

    function handleAiringChange(e) {
        setAiring(oldAiring => !oldAiring);
    }

    function getFormData(e) {
        e.preventDefault();
        let formData = {
            input,
            genre,
            year,
            airing,
        };
        handleSearch(formData);
    }

    return (
        <div className='Search'>
            <h3>Simple jikan api consuming anime searching app</h3>
            <p>Have you ever wanted to search for an anime series, but didn't feel like using google and somehow ended in here? Fret not, for you can still achieve your goal!</p>
            <p>Just write the name of the anime you're looking for and let the magic happen! (after a few seconds)</p>
            <p>You can also click on the results to read a synopsis and stuff</p>
            <Form className='formContainer'>
                    <Form.Group className='mb-3'>
                        <Form.Control type="input" placeholder='by Name' value={input} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Select value={genre} onChange={handleGenreChange}>
                            <option value=''>by Genre</option>
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

                    <Form.Group className='mb-3'>
                        <Form.Select value={year} onChange={handleYearChange}>
                            <option value=''>by Year</option>
                            {years.map(number => <option key={number} value={number}>{number}</option>)}
                        </Form.Select>
                    </Form.Group>

                    <Form.Check checked={airing}  onChange={handleAiringChange} type='checkbox' id='Airing' label='Airing'/>


                    <Button type="submit" onClick={getFormData}>
                            Search <BiSearch />
                    </Button>
            </Form>
        </div>
    )
}

export default Search

//Name
//Genre
//Year (starting)
//Airing (box yes or no)
