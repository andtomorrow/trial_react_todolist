export function FilterForm({ filterName, setFilterName, hideCompletedFilter, setHideCompletedFilter }) {
  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
      </div>
      <label>
        <input type="checkbox" checked={hideCompletedFilter} onChange={(e) => setHideCompletedFilter(e.target.checked)} />
        Hide Completed
      </label>
    </div>
  )
}
