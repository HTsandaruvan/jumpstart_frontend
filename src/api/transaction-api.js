import axios from "./axios"

const TRANSACTION_URL = "/api/paypal"

export const createPaymentApi = async (token) => {
  try {
    const response = await axios.get(`${TRANSACTION_URL}/init`, {
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

export const completePaymentApi = async (token, captureToken) => {
  try {
    const response = await axios.get(`${TRANSACTION_URL}/capture?token=${captureToken}`, {
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