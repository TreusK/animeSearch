import './SingleCard.css';
import { Card, ListGroup } from 'react-bootstrap';

function SingleCard({ anime }) {
    return (
        <Card className='CardComp'>
            <Card.Img variant="top" src={anime.images.webp.image_url} className='CardImgComp'/>
            <Card.Body className='CardBodyComp'>
                <Card.Text className='CardTxtComp'>{anime.title_english}</Card.Text>
                <Card.Text className='CardTxtComp CardTxtCompJap'>{anime.title_japanese}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <ListGroup variant="flush">
                    <ListGroup.Item variant='light'>score: {anime.score}</ListGroup.Item>
                    <ListGroup.Item variant='secondary'>episodes: {anime.episodes}</ListGroup.Item>                
                </ListGroup>
            </Card.Footer>
        </Card>
    )
}

export default SingleCard