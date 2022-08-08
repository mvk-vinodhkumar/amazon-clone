import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-f1e68/us-central1/api", //API will go here
})

export default instance
