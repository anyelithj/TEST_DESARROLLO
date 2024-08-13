import "../../App.css";

const Pagination = ({ nPages, currentPage, setCurrentPage, setDataQt }) => {
  const next = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prev = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const change = (e) => {
    setDataQt(e.target.value);
  };
  return (
    <div className="pagination">
      <button className="pagination__button pagination__button--prev" onClick={prev}>
        Prev
      </button>
      <div className="pagination__controls">
        <select className="pagination__select" onChange={(e) => change(e)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <span className="pagination__current-page" onClick={prev}>
          {currentPage}/{nPages}
        </span>
      </div>
      <button className="pagination__button pagination__button--next" onClick={next}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
