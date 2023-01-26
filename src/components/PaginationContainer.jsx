import "./PaginationContainer.css";
import { Pagination } from "react-bootstrap";

function PaginationContainer({ currentPage, numPages, handlePageClick }) {
  const items = new Array(numPages).fill(0).map((_, i) => (
    <Pagination.Item
      key={`pagination.${i}`}
      active={currentPage == i + 1}
      onClick={() => handlePageClick(i + 1)}
    >
      {i + 1}
    </Pagination.Item>
  ));

  return (
    <div className="PaginationContainer">
      <Pagination size="sm">{items}</Pagination>
    </div>
  );
}

export default PaginationContainer;
