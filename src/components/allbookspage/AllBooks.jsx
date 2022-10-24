import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";
import BookItem from "./BookItem";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const AllBooks = () => {
  const { allBooks } = useContext(AppContext);
  const items = [...Array(allBooks.length).keys()];

  function Items({ currentItems }) {
    return (
      <div className="current-books">
        {currentItems &&
          currentItems.map((item, index) => (
            <BookItem key={index} book={allBooks[item]} />
          ))}
      </div>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <div className="books-container">
        <header className="header-info">
          <Link className="page-link" to="/books">
            <MdArrowBack className="user-icon" />
            Back
          </Link>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
            paginationClassName = "pagination"
          />
        </header>
        <Items currentItems={currentItems} />
      </div>
    );
  }
  return <PaginatedItems itemsPerPage={4} />;
};

export default AllBooks;
