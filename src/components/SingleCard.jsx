import "./SingleCard.css";
import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

function SingleCard({ anime }) {
  const [flip, setFlip] = useState(false);

  const scoreVariant = (() => {
    if (!anime.score) {
      return "light";
    }
    if (anime.score < 5.5) {
      return "danger";
    }
    if (anime.score < 7.5) {
      return "warning";
    }
    return "success";
  })();

  return (
    <Card
      className="CardComp"
      border="secondary"
      bg={!flip ? "light" : "dark"}
      text={!flip ? "dark" : "white"}
    >
      {!flip && (
        <div className="front" onClick={() => setFlip((oldFlip) => !oldFlip)}>
          <Card.Img
            variant="top"
            src={anime.images.webp.image_url}
            className="CardImgComp"
          />
          <Card.Body className="CardBodyComp overflow">
            <Card.Text className="CardTxtComp">
              {anime.title_english ? anime.title_english : anime.title}
            </Card.Text>
            <Card.Text className="CardTxtComp CardTxtCompJap">
              {anime.title_japanese}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="CardFooterComp">
            <ListGroup variant="flush">
              <ListGroup.Item
                className="listGroupItemComp"
                variant={scoreVariant}
              >
                <p>score</p> <p>{anime.score}</p>
              </ListGroup.Item>
              <ListGroup.Item className="listGroupItemComp" variant="secondary">
                <p>episodes</p> <p>{anime.episodes}</p>
              </ListGroup.Item>
            </ListGroup>
          </Card.Footer>
        </div>
      )}

      {flip && (
        <div onClick={() => setFlip((oldFlip) => !oldFlip)}>
          <Card.Img
            variant="top"
            src={anime.images.webp.image_url}
            className="CardImgComp"
          />
          <Card.Body className="CardBodyComp overflow">
            <Card.Text className="CardTxtComp">
              {anime.synopsis == null || anime.synopsis.lenght == 0
                ? "No synopsis found"
                : anime.synopsis}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <ListGroup variant="flush">
              <ListGroup.Item className="listGroupItemComp" variant="dark">
                <p>year</p>{" "}
                <p>{anime.aired ? anime.aired.prop.from.year : "---"}</p>
              </ListGroup.Item>
              <ListGroup.Item
                className="listGroupItemComp overflow"
                variant="info"
              >
                {anime.url ? (
                  <a href={anime.url} target="_blank">
                    My Anime List
                  </a>
                ) : (
                  "---"
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card.Footer>
        </div>
      )}
    </Card>
  );
}

export default SingleCard;
