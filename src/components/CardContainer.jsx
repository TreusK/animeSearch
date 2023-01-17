import './CardContainer.css';
import {Col, Row, Spinner} from 'react-bootstrap';
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
            <Row>
            { (filteredAnimeList && filteredAnimeList.length > 0)
                ? filteredAnimeList.map(anime => <Col key={anime.mal_id}><SingleCard anime={anime} /></Col>)
                : <h1>Random h1 on undefined anime list</h1>}
            </Row>
        </div>
    )
}

export default CardContainer