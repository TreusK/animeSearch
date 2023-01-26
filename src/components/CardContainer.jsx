import styles from "./CardContainer.module.css";
import { Spinner } from "react-bootstrap";
import SingleCard from "./SingleCard";
import PaginationContainer from "./PaginationContainer";
import img404 from "../assets/404.png";
import rei from "../assets/rei.jpg";
import { formIsEmpty } from "../helpers";

export default function CardContainer({
  animeList,
  loading,
  formData,
  currentPage,
  handlePageClick,
  numPages,
}) {
  // Loading data shows the Spinner
  if (loading) {
    return (
      <>
        {numPages > 1 && (
          <PaginationContainer
            numPages={numPages}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        )}
        <div className={styles.cardContainer}>
          <Spinner animation="border" role="status" />
        </div>
      </>
    );
  }

  // Nonexistent filtered anime list shows the initial message
  if (!animeList || formIsEmpty(formData)) {
    return (
      <div className={styles.cardContainer}>
        <img className={styles.reiImg} src={rei} />
      </div>
    );
  }

  // Take words from the search and filter the results of the api with them (the api itself filters terribly)
  const wordsInSearch = formData.input.split(" ");
  const filteredAnimeList = animeList.filter(
    (anime) =>
      checkWords(anime.title_english, wordsInSearch) ||
      checkWords(anime.title, wordsInSearch)
  );

  return (
    <>
      {numPages > 1 && (
        <PaginationContainer
          numPages={numPages}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      )}
      <div className={styles.cardContainer}>
        {filteredAnimeList.length === 0 ? (
          <SingleCard anime={notFoundPlaceholder} />
        ) : (
          filteredAnimeList.map((anime) => (
            <SingleCard key={anime.mal_id} anime={anime} />
          ))
        )}
      </div>
    </>
  );
}

const notFoundPlaceholder = {
  mal_id: 100000,
  images: {
    webp: {
      image_url: img404,
    },
  },
  title_english: "Not Found",
  title_japanese: "404",
  score: "",
  episodes: "",
};

/** Helper function to filter the data from the api */
function checkWords(title, wordsArr) {
  if (!title) {
    return false;
  }
  for (const word of wordsArr) {
    if (!title.toLowerCase().includes(word.toLowerCase())) {
      return false;
    }
  }
  return true;
}
