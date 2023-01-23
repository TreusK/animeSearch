import './PaginationContainer.css';
import {Pagination} from 'react-bootstrap';

function PaginationContainer({currentPage, pagesAmount, handlePageClick}) {
    let items = [];
    for (let number = 1; number <= pagesAmount; number++) {
        items.push(
            <Pagination.Item key={number} id={number} active={number == currentPage} onClick={(e) => handlePageClick(e.target.id)}>
                {number}
            </Pagination.Item>,
        )
    };


   return (
       <div className='PaginationContainer'>
           <Pagination size="sm">{items}</Pagination>
       </div>
   )
}

export default PaginationContainer
