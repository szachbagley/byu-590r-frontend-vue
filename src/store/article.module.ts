import articleService from "../services/article.service"

const initialState = { articlesList: [], publications: [] }

export const article = {
	namespaced: true,
	state: initialState,
	actions: {
		getArticles({ commit }) {
			return articleService.getArticles().then((articles) => {
				commit("setArticles", articles)
				return Promise.resolve(articles)
			})
		},
		updateArticle({ commit }, article) {
			return articleService.updateArticle(article).then((response) => {
				commit("setArticle", response)
				return Promise.resolve(response)
			})
		},
		createArticle({ commit }, article) {
			return articleService.createArticle(article).then((response) => {
				commit("addArticle", response.article)
				return Promise.resolve(response.article)
			})
		},
		deleteArticle({ commit }, articleId) {
			return articleService.deleteArticle(articleId).then((response) => {
				commit("removeArticle", response.article)
				return Promise.resolve(response.article)
			})
		},
		updateArticlePicture({ commit }, article) {
			return articleService
				.updateArticlePicture(article)
				.then((response) => {
					commit("updateArticlePicture", response.article)
					return Promise.resolve(response.article)
				})
		}
	},
	mutations: {
		setArticles(state, articles) {
			state.articlesList = articles
			state.publications = []

			const publicationsMap = new Map()

			for (const article of articles) {
				if (
					article.publication &&
					!publicationsMap.has(article.publication.id)
				) {
					publicationsMap.set(article.publication.id, {
						id: article.publication.id,
						name: article.publication.name
					})
				}
			}
			state.publications = Array.from(publicationsMap.values())
		},
		addArticle(state, article) {
			state.articlesList.push(article)
		},
		updateArticlePicture(state, article) {
			const index = state.articlesList.findIndex(
				(a) => a.id === article.id
			)
			if (index !== -1) {
				// Assuming your display uses image_url:
				state.articlesList[index].image_url =
					article.image_url || article.image
			}
		},
		setArticle(state, updatedArticle) {
			const index = state.articlesList.findIndex(
				(a) => a.id === updatedArticle.id
			)
			if (index !== -1) {
				state.articlesList.splice(index, 1, updatedArticle)
			}
		},
		removeArticle(state, article) {
			const index = state.articlesList.findIndex(
				(a) => a.id === article.id
			)
			state.articlesList.splice(index, 1)
		}
	}
}
