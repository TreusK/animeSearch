import './CardContainer.css';
import SingleCard from './SingleCard';

function CardContainer({ animeList, loading }) {
    if(loading) {
        return (<h2>Imma spinner wopinng woinnngg (spinning sounds)</h2>);
    }   
    return (
        <div className='cardContainer'>
            {animeList
                ? <SingleCard animeList={animeList[0]} />
                : <h1>Random h1 on undefined anime list</h1>}
        </div>
    )
}

export default CardContainer