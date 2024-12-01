import axios from "./axios"

const USER_URL = "/api/user"

export const myProfileApi = async (token) => {
  try {
    const response = await axios.get(`${USER_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data
    } else {
      return "No respon from server"
    }
  }
}

export const updateProfileApi = async (token, updateProfileRequest) => {
  try {
    const response = await axios.put(`${USER_URL}/update-profile`, updateProfileRequest, {
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

export const addProductToCartApi = async (token, cartItemRequest) => {
  try {
    const response = await axios.post(`${USER_URL}/add-product-to-cart`, cartItemRequest, {
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

export const getMyCartApi = async (token) => {
  try {
    const response = await axios.get(`${USER_URL}/get-my-cart`, {
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


export const deleteCartItemByIdApi = async (token, cartItemId) => {
  try {
    const response = await axios.delete(`${USER_URL}/delete-cart-item/${cartItemId}`, {
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

export const getMyOrdersApi = async (token, filter, orderBy) => {
  let param = "";
  if (filter !== null && orderBy === null) {
    param = `?filter=${filter}`
  } else if (orderBy !== null && filter === null) {
    param = `?order=${orderBy}`
  } else if (filter !== null && orderBy !== null) {
    param = `?filter=${filter}&order=${orderBy}`
  }

  try {
    const response = await axios.get(`${USER_URL}/my-orders${param}`, {
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

export const showSnapshotDetailsBySlugApi = async (token, slug) => {
  try {
    const response = await axios.get(`${USER_URL}/my-orders/snapshot/slug/${slug}`, {
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