import './CardContainer.css';
import {Spinner} from 'react-bootstrap';
import SingleCard from './SingleCard';
import img404 from '../assets/404.png';

function CardContainer({ animeList, loading, searchName }) {
    //Take words from the search and filter the results of the api with them (the api itself filters terribly)
    let wordsInSearch = searchName.split(' ');
    let filteredAnimeList = animeList 
                                ? animeList.filter(anime => checkWords(anime.title_english, wordsInSearch) || checkWords(anime.title, wordsInSearch)) 
                                : undefined;

    //Make a 404 card in case there are no results                               
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

    //Helper function to filter the data form the api
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


    //Loading data shows the Spinner
    if(loading) {
        return (
            <div className='cardContainer'>
                <Spinner animation="border" role="status" />
            </div>
        );
    }   
    //Unexistent filtered anime list shows the initial message
    if(!filteredAnimeList) {
        return (
            <div className="cardContainer">
                <h1>World's best website to search anime!</h1>  
            </div>  
        )
    }

    return (
        <>
            <div className='cardContainer'>
                {filteredAnimeList.map(anime => <SingleCard key={anime.mal_id} anime={anime} />)}
            </div>
        </>
    )
}

export default CardContainer