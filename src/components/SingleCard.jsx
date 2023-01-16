//import './Card.css';
import { Card, ListGroup } from 'react-bootstrap';

function SingleCard({ animeList }) {
    console.log(animeList)
    return (
        <Card style={{ width: '14rem' }}>
            <Card.Img variant="top" src={animeList.images.webp.image_url} />
            <Card.Body>
                <Card.Title>{animeList.title_english}</Card.Title>
                <Card.Title>{animeList.title_japanese}</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>EPISODES: {animeList.episodes}</ListGroup.Item>
                    <ListGroup.Item>SCORE: {animeList.score}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default SingleCard