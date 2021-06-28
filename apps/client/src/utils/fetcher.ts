import axios from 'axios'

import { AuthToken } from '~/utils/authToken'

const API_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000'
		: 'https://www.api.novac.higoralves.dev'

const config = {
	headers: { Authorization: `Bearer ${AuthToken.getToken()}` }
}

export const api = axios.create({
	baseURL: API_URL,
	...config
})
