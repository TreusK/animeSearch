import './App.css';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Header from './components/Header';
import Search from './components/Search';
import CardContainer from './components/CardContainer';

//helper functions
import {formIsEmpty, constructQuery} from './components/helper.js';


function App() {
    const [animeList, setAnimeList] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pagesAmount, setPagesAmount] = useState(0);;
    const [formData, setFormData] = useState({
        input: '',
        genre: '',
        year: '',
        currentPage: '',
    })
    

    useEffect(() => {
        let ignore = false;
        if (!formIsEmpty(formData)) {
            setLoading(true); 
            console.log('fetchin');
            let searchQuery = constructQuery(formData);
            fetch(`https://api.jikan.moe/v4/anime?${searchQuery}`)
                .then(res => {
                    if (!res.ok) throw new Error(res.status);
                    else return res.json()
                })
                .then(data => {
                    if (!ignore) {
                        setAnimeList(data.data);
                        setPagesAmount(data.pagination.last_visible_page);
                    }     
                })
                .catch(error => setError(true))
                .finally(() => setLoading(false))
        };
        return () => {
            ignore = true;
        };
    }, [formData]);

    //handling state functions
    function handleSearch(obj) {
        setPagesAmount(0);
        setFormData(obj);
    }

    function handlePageClick(id) {
        if(id == formData.currentPage) return;
        setFormData({
            ...formData,
            currentPage: id,
        });
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
            <Search onSearch={handleSearch} />
            <CardContainer animeList={animeList} loading={loading} formData={formData} 
                           currentPage={formData.currentPage} pagesAmount={pagesAmount} 
                           onPageClick={handlePageClick} />
        </div>
    )
}

export default App
