// let API_URL = "http://localhost:8000/api/"
// export default API_URL

let API_URL = "http://3.16.194.27:8888/api/"
if (import.meta.env.MODE === "development") {
	API_URL = "http://127.0.0.1:8000/api/"
}
export default API_URL
