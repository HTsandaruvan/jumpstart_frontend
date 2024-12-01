import axios from "./axios"

const ADMIN_URL = "/api/admin"

export const createCategoryApi = async (token, createCategoryRequest) => {
  try {
    const response = await axios.post(`${ADMIN_URL}/create-category`, createCategoryRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw "No respon from server"
    }
  }
}

export const addProductApi = async (token, productRequest) => {
  try {
    const response = await axios.post(`${ADMIN_URL}/add-product`, productRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    })
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw "No respon from server"
    }
  }
}

export const updateProductApi = async (token, slug, productRequest) => {
  try {
    const response = await axios.put(`${ADMIN_URL}/update-product/${slug}`, productRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    })
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw "No respon from server"
    }
  }
}

export const deleteProductByProductIdApi = async (token, productId) => {
  try {
    const response = await axios.delete(`${ADMIN_URL}/delete-product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw "No respon from server"
    }
  }
}

export const deleteUserByUserIdApi = async (token, userId) => {
  try {
    const response = await axios.delete(`${ADMIN_URL}/delete-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw "No respon from server"
    }
  }
}

export const getOrdersApi = async (token, filter, orderBy) => {
  let param = "";
  if (filter !== null && orderBy === null) {
    param = `?filter=${filter}`
  } else if (orderBy !== null && filter === null) {
    param = `?order=${orderBy}`
  } else if (filter !== null && orderBy !== null) {
    param = `?filter=${filter}&order=${orderBy}`
  }

  try {
    const response = await axios.get(`${ADMIN_URL}/orders${param}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
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

export const completeOrderApi = async (token, orderId) => {
  console.log("id api:" + orderId)
  try {
    const response = await axios.get(`${ADMIN_URL}/complete-order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
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

export const cancelOrderApi = async (token, orderId) => {
  console.log("id api:" + orderId)
  try {
    const response = await axios.get(`${ADMIN_URL}/cancel-order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
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

export const showUsersApi = async (token) => {
  try {
    const response = await axios.get(`${ADMIN_URL}/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
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

export const showStatsApi = async (token) => {
  try {
    const response = await axios.get(`${ADMIN_URL}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
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