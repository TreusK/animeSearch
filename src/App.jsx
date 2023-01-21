import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import CardContainer from './components/CardContainer';


function App() {
    const [animeList, setAnimeList] = useState();
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [formData, setFormData] = useState({
        input: '',
        genre: '',
        year: '',
    })

    useEffect(() => {
        if(!formIsEmpty(formData)) {
            setLoading(true);
            let searchQuery = `q=${formData.input}&genres=${formData.genre}&start_date=${formData.year}`
            fetch(`https://api.jikan.moe/v4/anime?${searchQuery}`)
                .then(res => res.json())
                .then(data => setAnimeList(data.data))
                .catch(error => console.log(error))
                .finally(() => setLoading(false))
        }       
    }, [formData]);

    function handleSearch(obj) {
        setFormData(obj); 
    }

    //Helper functions
    function formIsEmpty(obj) {
        let isEmpty = true;
        for(let key in obj) {
            if(obj[key] !== '') {isEmpty = false}
        };
        return isEmpty;
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
