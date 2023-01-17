import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import CardContainer from './components/CardContainer';

let testAnime = {
    image: 'urlhere',
    titleEN: 'strHere',
    titleJP: 'titlteJpHere',
    episodes: 20,
    synopsis: 'looooooooooong str here',
}

function App() {
    const [animeList, setAnimeList] = useState();
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        if (searchName.length > 2) {
            setLoading(true);
            fetch(`https://api.jikan.moe/v4/anime?q=${searchName}`)
                .then(res => res.json())
                .then(data => setAnimeList(data.data))
                .catch(error => console.log(error))
                .finally(() => setLoading(false))
        }
    }, [searchName]);

    function handleSearch(e, input) {
        e.preventDefault();
        setSearchName(input);
    }

    return (
        <Container fluid className='px-0'>
            <Header />
            <Search handleSearch={handleSearch} />
            <CardContainer animeList={animeList} loading={loading} searchName={searchName}/>
        </Container>
    )
}

export default App
