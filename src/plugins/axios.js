"use strict";

import axios from "axios";

let config = {
  baseURL: process.VUE_APP_API_URL || process.env.baseURL || process.env.apiUrl || "",
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

export default _axios;
