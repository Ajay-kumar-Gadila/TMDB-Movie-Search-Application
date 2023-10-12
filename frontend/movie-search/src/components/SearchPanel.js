export default function SearchPanel(params) {
  return (
    <div className="container my-5">
      <div className="bg-body-tertiary p-5 rounded">
        <div className="col-sm-8 py-1 mx-auto">
          <form onSubmit={params.navToSearch} className="inline">
            <input
              name="search"
              className=" search-text"
              type="text"
              placeholder="Search a movie of your choice..."
              aria-label=".form-control-lg example"
              required
              size="90"
            />
            <button type="submit" class="btn btn-primary mb-3 button-search">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
