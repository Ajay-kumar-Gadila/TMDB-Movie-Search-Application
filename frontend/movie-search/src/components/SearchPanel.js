export default function SearchPanel(params) {
  return (
    <div className="container my-5">
      <div className="bg-body-tertiary p-5 rounded">
        <div className="col-sm-8 py-1 mx-auto">
          <form onSubmit={params.navToSearch} className="inline custom-form">
          <input
              name="search"
              className="form-control form-control-lg custom-input-form"
              type="text"
              placeholder="Search "
              aria-label=".form-control-lg example"
              required
            />
            <button type="submit" className="btn btn-primary mb-3 custom-search-btn">
              Search 
            </button> 
           </form>
        </div>
      </div>
    </div>
  );
}
