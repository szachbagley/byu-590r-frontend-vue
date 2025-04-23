export default function authHeader(type = null) {
	let user = JSON.parse(localStorage.getItem("user"))

	let header

	if (user && user.token) {
		if (type === "multipart") {
			return {
				Authorization: "Bearer " + user.token,
				"Content-Type": "multipart/form-data"
			}
		}
		header = { Authorization: "Bearer " + user.token }
		return header
	} else {
		header = {}
		console.log("authHeader:", header) // Log the header at runtime
		return header
	}
}
