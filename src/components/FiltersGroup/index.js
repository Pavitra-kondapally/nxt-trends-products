import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    clickingClearFilters,
    onSelectingCategory,
    onSelectingRating,
  } = props

  const onClearingFilters = () => {
    clickingClearFilters()
  }

  const onClickCategory = categoryId => {
    onSelectingCategory(categoryId)
  }

  const onClickRating = ratingId => {
    onSelectingRating(ratingId)
  }

  return (
    <div className="filters-group-container">
      <h1 className="filter-title-style">Category</h1>
      <ul className="category-list">
        {categoryOptions.map(eachCategory => (
          <li
            className="list-option"
            onClick={() => onClickCategory(eachCategory.categoryId)}
            key={eachCategory.categoryId}
          >
            {eachCategory.name}
          </li>
        ))}
      </ul>
      <h1 className="filter-title-style">Rating</h1>
      <ul>
        {ratingsList.map(eachRating => (
          <button
            type="button"
            className="rating-btn"
            onClick={() => onClickRating(eachRating.ratingId)}
          >
            <img
              src={eachRating.imageUrl}
              className="rating-image"
              alt="rating {ratingId}"
            />
          </button>
        ))}
      </ul>
      <button
        className="clear-filter-btn"
        type="button"
        onClick={onClearingFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
