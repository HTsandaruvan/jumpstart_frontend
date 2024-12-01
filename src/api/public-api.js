import axios from "./axios"

export const showAllCategoriesApi = async () => {
  try {
    const response = await axios.get("/api/category/categories?order=asc")
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data
    } else {
      return "No respon from server"
    }
  }
}

export const showAllProductsApi = async () => {
  try {
    const response = await axios.get("/api/product/products")
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data
    } else {
      return "No respon from server"
    }
  }
}

export const searchForProductsApi = async (categorySlug, query) => {
  const handleSearchEndPoint = () => {
    if (categorySlug !== null && query !== null) {
      return `api/product/products/search?category=${categorySlug}&q=${query}`
    } else if (categorySlug !== null) {
      return `api/product/products/search?category=${categorySlug}`
    } else if (query !== null) {
      return `api/product/products/search?q=${query}`
    }

    return `api/product/products/search`
  }
  try {
    const response = await axios.get(`${handleSearchEndPoint()}`)
    return response
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw "No respon from server"
    }
  }
}

export const showProductDetailsApiBySlug = async (slug) => {
  try {
    const response = await axios.get(`/api/product/products/slug/${slug}`)
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response
    } else {
      throw "No respon from server"
    }
  }
}