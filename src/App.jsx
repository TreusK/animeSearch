import './App.css';
import { useState, useEffect, useRef } from 'react';
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
        currentPage: '',
    })
    //Pages states
    const [pagesAmount, setPagesAmount] = useState(0);


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

    //Helper functions
    function formIsEmpty(obj) {
        let isEmpty = true;
        for (let key in obj) {
            if (obj[key] !== '' && obj[key] != 1) { isEmpty = false }
        };
        return isEmpty;
    }

    function constructQuery(obj) {
        let inputQuery = (obj.input !== '') ? `q=${obj.input}&` : '';
        let genreQuery = (obj.genre !== '') ? `genres=${obj.genre}&` : '';
        let yearsQuery = (obj.year !== '') ? `start_date=${obj.year}&end_date=${+obj.year+1}&` : '';
        let pageQuery = (obj.currentPage !== 1) ? `page=${obj.currentPage}&` : '';
        let orderQuery = 'order_by=mal_id&'
        return (inputQuery + genreQuery + yearsQuery + orderQuery + pageQuery);
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
            <CardContainer animeList={animeList} loading={loading} formData={formData} 
                           currentPage={formData.currentPage} pagesAmount={pagesAmount} 
                           handlePageClick={handlePageClick} formIsEmpty={formIsEmpty} />
        </div>
    )
}

export default App
