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
    <>
      <div style={{ display: "flex", margin: " 1.5rem" }}>
        <button className="button" onClick={prev}>
          Prev
        </button>
        <div className="showPage">
          <select className="selectPage" onChange={(e) => change(e)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="currentPage" onClick={prev}>
            {currentPage}/{nPages}
          </span>
        </div>
        <button className="button" onClick={next}>
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
