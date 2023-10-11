export default function Pagination({
  handlePagination,
  pagination,
  totalPages,
}) {
  return (
    <div className="container">
      <div className="row">
        <ul className="pagination">
          {pagination.map((value, index) => {
            return (
              <li key={index} className="page-item">
                <a
                  key={index}
                  onClick={(event) => {
                    handlePagination(event, value);
                  }}
                  className="page-link"
                  href="google.com"
                >
                  {value}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
