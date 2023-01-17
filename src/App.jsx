import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import CardContainer from './components/CardContainer';


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
        <div className='App'>
            <Header />
            <Search handleSearch={handleSearch} />
            <CardContainer animeList={animeList} loading={loading} searchName={searchName}/>
        </div>
    )
}

export default App
