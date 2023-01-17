import './CardContainer.css';
import {Spinner} from 'react-bootstrap';
import SingleCard from './SingleCard';

function CardContainer({ animeList, loading, searchName }) {
    let wordsInSearch = searchName.split(' ');
    let filteredAnimeList = animeList 
                                ? animeList.filter(anime => checkWords(anime.title_english, wordsInSearch)) 
                                : undefined;

    function checkWords(title, wordsArr) {
        let containsAll = true;
        if(title === null) {
            containsAll = false;
            return;
        }
        for(let word of wordsArr) {
            if(!title.toLowerCase().includes(word.toLowerCase())) {
                containsAll = false
            }
        }
        return containsAll;
    }

    if(loading) {
        return (
            <div className='cardContainer'>
                <Spinner animation="border" role="status" />
            </div>
        );
    }   
    return (
        <div className='cardContainer'>
            { (filteredAnimeList && filteredAnimeList.length > 0)
                ? filteredAnimeList.map(anime => <SingleCard key={anime.mal_id} anime={anime} />)
                : <h1>Random h1 on undefined anime list</h1>}
        </div>
    )
}

export default CardContainer