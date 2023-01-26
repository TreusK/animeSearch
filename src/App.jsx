import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Header from "./components/Header";
import Search from "./components/Search";
import CardContainer from "./components/CardContainer";
import { formIsEmpty, useSearchParams } from "./helpers";
import { useMemo } from "react";

function App() {
  // We're basing the search on the URL params
  const { searchParams, setSearchParams } = useSearchParams();

  // We're using useMemo to avoid re-creating the formData object on every render
  const formData = useMemo(
    () => ({
      input: searchParams.input || "",
      genre: searchParams.genre || "",
      year: searchParams.year || "",
      page: searchParams.page || "",
    }),
    [searchParams]
  );

  // The fetchAnime function is re-created every time the formData changes
  const fetchAnime = useMemo(() => createAnimeFetcher(formData), [formData]);

  // Whenever the fetchAnime function changes, the usePromise hook will run it again
  const { loading, data, error, clearError } = usePromise(fetchAnime);

  return (
    <div className={styles.app}>
      <Modal show={error} onHide={clearError}>
        <Modal.Header closeButton>
          <Modal.Title>Whoops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Something went wrong. Try again later.</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" size="sm" onClick={clearError}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Header />
      <Search handleSearch={setSearchParams} />
      <CardContainer
        animeList={data?.data || []}
        loading={loading}
        formData={formData}
        currentPage={formData.page}
        numPages={data?.pagination?.last_visible_page || 0}
        handlePageClick={(pageNumber) => {
          setSearchParams({ ...formData, page: pageNumber });
        }}
      />
    </div>
  );
}

/** Runs a given promise function and returns the data. Whenever the function changes, it's ran again */
const usePromise = (promiseFn) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // This can happen if the form is empty. See createAnimeFetcher
    if (!promiseFn) {
      return;
    }
    let ignore = false;
    setLoading(true);

    promiseFn()
      .then((data) => {
        if (!ignore) {
          setData(data);
        }
      })
      .catch(() => setError(true))
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [promiseFn]);

  return {
    loading,
    data,
    error,
    clearError: () => setError(false),
  };
};

/**
 * This function is responsible for returning a function that will fetch the data from the API.
 */
const createAnimeFetcher = (formData) => {
  // We don't want to fetch data if the form is empty
  if (formIsEmpty(formData)) {
    return;
  }

  // Return a function that will be called by usePromise
  return async () => {
    const params = {
      q: formData.input,
      order_by: "mal_id",
      page: formData.page || 1,
    };

    if (formData.year) {
      params.start_date = formData.year;
      params.end_date = (+formData.year + 1).toString();
    }

    if (formData.genre) {
      params.genres = formData.genre;
    }

    const searchQuery = new URLSearchParams(params);
    const res = await fetch("https://api.jikan.moe/v4/anime?" + searchQuery);
    if (!res.ok) {
      throw new Error(`Failed with error code ${res.status}`);
    }
    return await res.json();
  };
};

export default App;
