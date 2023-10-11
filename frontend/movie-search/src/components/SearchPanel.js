export default function SearchPanel(params) {
  return (
    <div className="container my-5">
      <div className="bg-body-tertiary p-5 rounded">
        <div className="col-sm-8 py-1 mx-auto">
          <form onSubmit={params.submitSearch} className="inline">
            <input
              name="search"
              className="form-control form-control-lg"
              type="text"
              placeholder="Search a movie of your choice..."
              aria-label=".form-control-lg example"
              required
            />

            <button type="submit" className="btn btn-primary mb-3">
              Search Movie
            </button>
            <p className="total-result">Total result found {params.totalResult}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
