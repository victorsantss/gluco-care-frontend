import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'https://localhost:7041' : ''
})

export default axiosInstance
