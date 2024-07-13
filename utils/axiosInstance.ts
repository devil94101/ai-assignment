"use client"
import axios from "axios"

export const headerParams = (default_headers: any = {}) => {
	const headers = default_headers
	headers["Content-Type"] = "application/json"
	headers["accept"] = "application/json"
	return headers
}

const axiosInstance = axios.create({
	baseURL: 'http://13.52.253.28/',
	timeout: 300000,
	headers: headerParams(),
})

export const interceptor = () => {
	axiosInstance.interceptors.request.use(function (config) {
		const existing_headers = config?.headers ?? {}
		config.headers = headerParams(existing_headers)
		return config
	})

	axiosInstance.interceptors.response.use(
		(response) => {
			return response
		},
		async (error) => {

			return Promise.reject(error?.response?.data)
		},
	)
}

export const AxiosInstance = axiosInstance
