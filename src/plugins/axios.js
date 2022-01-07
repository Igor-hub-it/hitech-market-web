import axios from "axios"

const config = {
  baseURL: process.env.VUE_APP_API_URL || process.env.baseURL || process.env.apiUrl || "",
  timeout: 60 * 1000,
  withCredentials: true,
}

const _axios = axios.create(config)

export default _axios
