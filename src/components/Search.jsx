import "./Search.css";
import { BiSearch } from "react-icons/bi";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useSearchParams } from "../helpers";

const currentYear = new Date().getFullYear();

/** Years from current year down to 1960 */
const years = new Array(currentYear - 1960 + 1)
  .fill(0)
  .map((_, i) => currentYear - i);

function Search({ handleSearch }) {
  const { searchParams } = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    handleSearch({
      input: formData.get("input"),
      genre: formData.get("genre"),
      year: formData.get("year"),
      page: "1",
    });
  };

  return (
    <div className="Search">
      <h3>Simple jikan api consuming anime searching app</h3>
      <p>
        Have you ever wanted to search for an anime series, but didn't feel like
        using google and somehow ended in here? Fret not, for you can still
        achieve your goal!
      </p>
      <p>
        Just write the name of the anime you're looking for and let the magic
        happen! (after a few seconds)
      </p>
      <p>Click on a card to flip it</p>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} className="mb-3">
            <Form.Control
              type="input"
              placeholder="by Name"
              name="input"
              defaultValue={searchParams.input}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} className="mb-3 labelContainer">
            <Form.Label>by Genre</Form.Label>
            <Form.Select name="genre" defaultValue={searchParams.genre}>
              <option value="">any</option>
              <option value="2">Adventure</option>
              <option value="4">Comedy</option>
              <option value="39">Detective</option>
              <option value="8">Drama</option>
              <option value="10">Fantasy</option>
              <option value="14">Horror</option>
              <option value="62">Isekai</option>
              <option value="7">Mystery</option>
              <option value="27">Shounen</option>
              <option value="36">Slice of Life</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} className="mb-3 labelContainer">
            <Form.Label>by Year</Form.Label>
            <Form.Select name="year" defaultValue={searchParams.year}>
              <option value="">any</option>
              {years.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Button variant="outline-dark" type="submit">
          Search <BiSearch />
        </Button>
      </Form>
    </div>
  );
}

export default Search;
