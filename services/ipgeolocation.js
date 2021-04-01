import axios from "axios"

const API_URL = `https://api.ipgeolocation.io/timezone`

export default {
    fetchByIP: (location = "dubai") =>
        axios.get(`${API_URL}?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&location=${location}`)
            .then(res => res.data)
}