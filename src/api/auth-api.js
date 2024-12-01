import axios from "./axios"

const AUTH_URL = "/api/auth"

export const registrationApi = async (registrationRequest) => {
  return await axios.post(`${AUTH_URL}/register`, {
    firstName: registrationRequest.firstName,
    lastName: registrationRequest.lastName,
    email: registrationRequest.email,
    password: registrationRequest.password,
  }).then(response => {
    if (!response.ok) {
      return {
        code: response.code,
        message: response.message
      }
    }
    return {
      code: response.code,
      message: response.message
    }
  }).catch((error) => {
    console.log(error)
  })
}

export const accountActivationApi = async (uuid) => {
  return await axios.get(`${AUTH_URL}/account-activation/${uuid}`)
}

export const loginApi = async (loginRequest) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, loginRequest)
    if (response.data) {
      return response.data
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data
    } else {
      return "No respon from server"
    }
  }
}

export const findAccounByUuidtApi = async (request) => {
  try {
    const response = await axios.get(`${AUTH_URL}/acc?find=${request}`)
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw "No respon from server"
    }
  }
}

export const findAccountApi = async (request) => {
  try {
    const response = await axios.post(`${AUTH_URL}/find-account`, request)
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw "No respon from server"
    }
  }
}

export const resetPasswordApi = async (request) => {
  try {
    const response = await axios.post(`${AUTH_URL}/reset-password`, request)
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    } else {
      throw "No respon from server"
    }
  }
}