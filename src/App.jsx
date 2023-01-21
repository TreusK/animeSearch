import './App.css';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Header from './components/Header';
import Search from './components/Search';
import CardContainer from './components/CardContainer';


function App() {
    const [animeList, setAnimeList] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        input: '',
        genre: '',
        year: '',
    })

    useEffect(() => {
        if (!formIsEmpty(formData)) {
            setLoading(true); 
            let searchQuery = constructQuery(formData);
            fetch(`https://api.jikan.moe/v4/anime?${searchQuery}`)
                .then(res => {
                    if (!res.ok) throw new Error(res.status);
                    else return res.json()
                })
                .then(data => setAnimeList(data.data))
                .catch(error => setError(true))
                .finally(() => setLoading(false))
        }
    }, [formData]);

    function handleSearch(obj) {
        setFormData(obj);
    }

    //Helper functions
    function formIsEmpty(obj) {
        let isEmpty = true;
        for (let key in obj) {
            if (obj[key] !== '') { isEmpty = false }
        };
        return isEmpty;
    }

    function constructQuery(obj) {
        let inputQuery = (obj.input !== '') ? `q=${obj.input}&` : '';
        let genreQuery = (obj.genre !== '') ? `genres=${obj.genre}&` : '';
        let yearsQuery = (obj.year !== '') ? `start_date=${obj.year}&` : '';
        return (inputQuery + genreQuery + yearsQuery);
    }

    return (
        <div className='App'>
            {error &&
                <Modal show={error} onHide={() => setError(oldState => !oldState)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Whoops!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Something went wrong. Try again later.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-dark" size='sm' onClick={() => setError(oldState => !oldState)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>}
            <Header />
            <Search handleSearch={handleSearch} />
            <CardContainer animeList={animeList} loading={loading} formData={formData}/>
        </div>
    )
}

export default App
