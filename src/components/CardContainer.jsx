import './CardContainer.css';
import {Spinner} from 'react-bootstrap';
import SingleCard from './SingleCard';
import img404 from '../assets/404.png';

function CardContainer({ animeList, loading, searchName }) {
    let wordsInSearch = searchName.split(' ');
    let filteredAnimeList = animeList 
                                ? animeList.filter(anime => checkWords(anime.title_english, wordsInSearch) || checkWords(anime.title, wordsInSearch)) 
                                : undefined;

    if(filteredAnimeList && filteredAnimeList.length == 0) {
        filteredAnimeList = [{
            mal_id: 100000,
            images: {
                webp: {
                    image_url: img404,
                },
            },
            title_english: 'Not Found',
            title_japanese: '404',
            score: '',
            episodes: '',
        }]
    }

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
            { (filteredAnimeList)
                ? filteredAnimeList.map(anime => <SingleCard key={anime.mal_id} anime={anime} />)
                : <h1>World's best website to search anime!</h1>}
        </div>
    )
}

export default CardContainer