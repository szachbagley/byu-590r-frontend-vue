import axios from "axios"
import authHeader from "./auth-header"
import API_URL from "./env"

class ArticleService {
	getArticles() {
		return axios
			.get(API_URL + "articles", { headers: authHeader() })
			.then((response) => {
				console.log("Articles response:", response)
				return response.data.data
			})
			.catch((error) => {
				console.error("Error fetching articles:", error)
				throw error
			})
	}
	// updateArticle(article) {
	// 	return axios
	// 		.put(API_URL + "articles/" + article.id, article, {
	// 			headers: authHeader()
	// 		})
	// 		.then((response) => {
	// 			console.log("Article updated:", response)
	// 			return response.data
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error updating article:", error)
	// 			throw error
	// 		})
	// }
	updateArticle(article) {
		// send JSON payload so title/author/link aren’t lost
		const payload = {
			title: article.title,
			author: article.author,
			link: article.link,
			publication_id: Number(article.publication_id),
			topics: article.topics
		}

		return axios
			.put(`${API_URL}articles/${article.id}`, payload, {
				headers: authHeader()
			})
			.then((r) => r.data.data)
	}
	createArticle(article) {
		let formData = new FormData()
		formData.append("title", article.title)
		formData.append("publication_id", article.publication_id)
		formData.append("author", article.author)
		formData.append("link", article.link)
		formData.append("file", article.image)
		if (Array.isArray(article.topics)) {
			article.topics.forEach((id) => formData.append("topics[]", id))
		}

		return axios
			.post(API_URL + "articles", formData, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				console.log("Article created:", response)
				return response.data.data
			})
			.catch((error) => {
				console.error("Error creating article:", error)
				throw error
			})
	}
	deleteArticle(articleId) {
		return axios
			.delete(API_URL + "articles/" + articleId, {
				headers: authHeader()
			})
			.then((response) => {
				console.log("Article deleted:", response)
				return response.data.data
			})
			.catch((error) => {
				console.error("Error deleting article:", error)
				throw error
			})
	}
	updateArticlePicture(article) {
		let formData = new FormData()
		formData.append("image", article.image)

		return axios
			.post(
				API_URL + "articles/" + article.id + "/update_article_picture",
				formData,
				{
					headers: authHeader("multipart")
				}
			)
			.then((response) => {
				console.log("Article picture updated:", response)
				return response.data.data
			})
			.catch((error) => {
				console.error("Error updating article picture:", error)
				throw error
			})
	}
}

const articleService = new ArticleService()
export default articleService
