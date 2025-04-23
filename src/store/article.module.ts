import articleService from "../services/article.service"

const initialState = {
	articlesList: [],
	publications: [],
	topics: [] as { id: number; name: string }[]
}

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
		// setArticles(state, articles) {
		// 	state.articlesList = articles
		// 	state.publications = []
		// 	state.topics = []

		// 	const publicationsMap = new Map()
		// 	const topicsMap = new Map()

		// 	for (const article of articles) {
		// 		if (
		// 			article.publication &&
		// 			!publicationsMap.has(article.publication.id)
		// 		) {
		// 			publicationsMap.set(article.publication.id, {
		// 				id: article.publication.id,
		// 				name: article.publication.name
		// 			})
		// 		}
		// 	}
		// 	state.publications = Array.from(publicationsMap.values())
		// 	state.topics = Array.from(topicsMap.values())
		// 	for (const article of articles) {
		// 		if (article.topics) {
		// 			for (const topic of article.topics) {
		// 				if (!topicsMap.has(topic.id)) {
		// 					topicsMap.set(topic.id, {
		// 						id: topic.id,
		// 						name: topic.name
		// 					})
		// 				}
		// 			}
		// 		}
		// 	}
		// },
		setArticles(state, articles) {
			state.articlesList = articles
			const publicationsMap = new Map<
				number,
				{ id: number; name: string }
			>()
			const topicsMap = new Map<number, { id: number; name: string }>()

			for (const a of articles) {
				// pubs
				if (a.publication && !publicationsMap.has(a.publication.id)) {
					publicationsMap.set(a.publication.id, {
						id: a.publication.id,
						name: a.publication.name
					})
				}
				// topics
				if (a.topics) {
					for (const t of a.topics) {
						if (!topicsMap.has(t.id)) {
							topicsMap.set(t.id, { id: t.id, name: t.name })
						}
					}
				}
			}

			state.publications = Array.from(publicationsMap.values())
			state.topics = Array.from(topicsMap.values()) // ← move here
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
