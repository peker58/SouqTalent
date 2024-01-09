import axios from 'axios'
import { localGet } from './localStore'

export const Axios = axios.create({
	baseURL: `/api/v1`,
})

export const authAxios = axios.create({
	baseURL: `/api/v1`,
	headers: {
		Authorization: `Bearer ${localGet('UserData')?.accessToken}`,
		Accept: 'application/json',
	},
})
