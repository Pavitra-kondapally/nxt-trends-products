import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const {
    sortbyOptions,
    activeOptionId,
    titleSearch,
    changingTitleSearch,
    searchingInput,
  } = props

  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const onChangeSearch = event => {
    changingTitleSearch(event)
  }

  const handleKeyPress = event => {
    searchingInput(event)
  }

  return (
    <div className="products-header">
      <input
        type="search"
        className="search-box"
        value={titleSearch}
        onChange={onChangeSearch}
        placeholder="Search"
        onKeyDown={handleKeyPress}
      />
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
