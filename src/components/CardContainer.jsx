import './CardContainer.css';
import {Spinner} from 'react-bootstrap';
import SingleCard from './SingleCard';
import PaginationContainer from './PaginationContainer';
import img404 from '../assets/404.png';

function CardContainer({ animeList, loading, formData, currentPage, handlePageClick, pagesAmount }) {
    //Take words from the search and filter the results of the api with them (the api itself filters terribly)
    let wordsInSearch, filteredAnimeList;
    if(animeList) {
        wordsInSearch = formData.input.split(' ');
        filteredAnimeList = animeList.filter(anime => checkWords(anime.title_english, wordsInSearch) || checkWords(anime.title, wordsInSearch)); 
    }
    
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

    //Helper function to filter the data from the api
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
             <PaginationContainer pagesAmount={pagesAmount} currentPage={currentPage} handlePageClick={handlePageClick}/>
            <div className='cardContainer'>
                {filteredAnimeList.map(anime => <SingleCard key={anime.mal_id} anime={anime} />)}
            </div>
        </>
    )
}

export default CardContainer