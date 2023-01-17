import './Search.css';
import {useState} from 'react';

function Search({handleSearch}) {
    const [input, setInput] = useState('');

    function handleChange(e) {
        setInput(e.target.value);
    }

    return (
        <form className='formContainer'>
            <label className='h2'>Search an anime</label>
            <div className="inputContainer">
                <input className='input' type="input" placeholder="Sagrada Reset" value={input} onChange={(e) => handleChange(e)}/>
                <button type="submit" onClick={(e) => handleSearch(e, input)}>
                    Search
                </button>
            </div>
        </form>
    )
}

export default Search