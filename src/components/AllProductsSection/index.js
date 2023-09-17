import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    isError: false,
    activeOptionId: sortbyOptions[0].optionId,
    category: '', // Add category filter state
    rating: '', // Add rating filter state
    titleSearch: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, rating, titleSearch} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState(
        {
          productsList: updatedData,
          isLoading: false,
          isError: false,
        },
        this.getProducts,
      )
    }
    if (response.status === 401) {
      this.setState({isError: true})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changingTitleSearch = event => {
    this.setState({
      titleSearch: event.target.value,
    })
  }

  clickingClearFilters = () => {
    this.setState({
      category: '', // Add category filter state
      rating: '', // Add rating filter state
      titleSearch: '',
    })
  }

  onSelectingCategory = categoryId => {
    const categoryItem = categoryOptions.find(
      eachCategory => eachCategory.categoryId === categoryId,
    )
    this.setState({
      category: categoryItem.name,
    })
  }

  onSelectingRating = ratingId => {
    this.setState({rating: ratingId})
  }

  renderProductsList = () => {
    const {productsList, activeOptionId, titleSearch, isError} = this.state

    // TODO: Add No Products View
    let content

    if (isError) {
      content = (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
            className="failure-image"
            alt="products failure"
          />
          <h1 className="no-products-title">Oops! Something Went Wrong</h1>
          <p className="no-products-text">
            We are having some trouble processing your request. Please try again
          </p>
        </div>
      )
    } else if (productsList.length === 0) {
      content = (
        <div className="no-products-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            className="no-products-image"
            alt="no products"
          />
          <h1 className="no-products-title">No Products Found</h1>
          <p className="no-products-text">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    } else {
      content = (
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      )
    }

    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          titleSearch={titleSearch}
          changingTitleSearch={this.changingTitleSearch}
        />
        <div className="bottom-container">
          <FiltersGroup
            categoryOptions={categoryOptions}
            ratingsList={ratingsList}
            clickingClearFilters={this.clickingClearFilters}
            onSelectingCategory={this.onSelectingCategory}
            onSelectingRating={this.onSelectingRating}
          />
          {content}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}

        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
