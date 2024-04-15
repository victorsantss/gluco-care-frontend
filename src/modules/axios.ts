import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'https://gluco-care-api.azurewebsites.net' : ''
})

export default axiosInstance
