import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://gluco-care-api.azurewebsites.net'
})

export default axiosInstance
