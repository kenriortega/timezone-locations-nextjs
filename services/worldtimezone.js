import axios from "axios"

const API_URL = `https://worldtimeapi.org/api`

export default {
    list: () =>
        axios.get(`${API_URL}/timezone`).then(res => res.data),
    fetchByZone: (timezone) =>
        axios.get(`${API_URL}/timezone/${encodeURIComponent(timezone)}`)
            .then(res => res.data)
}