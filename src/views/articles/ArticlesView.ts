import { mapState } from "vuex"
import { useDisplay } from "vuetify"
import { computed } from "vue"
// import { link } from "fs"
import { auth } from "@/store/auth.module"
import { create } from "eslint-plugin-vue/lib/rules/attribute-hyphenation"
export default {
	name: "ArticlesView",
	computed: {
		...mapState({
			articles() {
				return this.$store.state.article.articlesList
			},
			publications() {
				return this.$store.state.article.publications
			}
		})
	},
	created() {
		this.getArticles()
	},
	data: function () {
		return {
			newArticle: {
				title: "",
				author: "",
				link: "",
				image: "",
				publication_id: ""
			},
			editArticle: {},
			selectedDeleteArticle: {},
			editArticleDialog: false,
			createArticleDialog: false,
			editImageChangeDialogBtn: false,
			deleteArticleDialog: false,
			articleIsDeleting: false
		}
	},
	methods: {
		getArticles() {
			this.$store
				.dispatch("article/getArticles")
				.then(() => {
					console.log("Articles fetched successfully")
				})
				.catch((error) => {
					console.error("Error fetching articles:", error)
				})
		},
		opencreateArticleDialog() {
			this.newArticle = {
				title: "",
				author: "",
				link: "",
				image: "",
				publication_id: 1
			}
			this.createArticleDialog = true
		},
		closeCreateDialog() {
			this.createArticleDialog = false
		},
		openEditDialog(article) {
			this.editArticle = article
			this.editArticleDialog = true
		},
		openDeleteDialog(article) {
			this.selectedDeleteArticle = article
			this.deleteArticleDialog = true
		},
		createArticle() {
			this.articleIsCreating = true
			this.newArticleErrorMessage = null
			this.$store
				.dispatch("article/createArticle", this.newArticle)
				.then(() => {
					this.closeCreateDialog()
					this.articleIsCreating = false
				})
				.catch((error) => {
					this.newArticleErrorMessage = error.response.data.data
					this.articleIsCreating = false
				})
		},
		updateArticle() {
			this.articleIsUpdating = true
			this.editArticleErrorMessage = null
			this.$store
				.dispatch("article/updateArticle", this.editArticle)
				.then(() => {
					this.editArticleDialog = false
					this.editImageChangeDialogBtn = false
					this.editArticle = {}
					this.articleIsUpdating = false
				})
				.catch((error) => {
					this.editArticleErrorMessage = error.response.data.data
					this.articleIsUpdating = false
				})
		},
		deleteArticle() {
			this.articleIsDeleting = true
			this.deleteArticleErrorMessage = null
			this.$store
				.dispatch(
					"article/deleteArticle",
					this.selectedDeleteArticle.id
				)
				.then(() => {
					this.deleteArticleDialog = false
					this.selectedDeleteArticle = {}
					this.articleIsDeleting = false
				})
				.catch((error) => {
					this.articleIsDeleting = false
					this.deleteArticleErrorMessage = error.response.data.data
				})
		},
		onExistingArticleImageChange(e) {
			var image = e.target.files || e.dataTransfer.files
			if (!image.length) return

			this.editArticle.image = image[0]
			this.articleIsUpdating = true
			this.$store
				.dispatch("article/updateArticlePicture", this.editArticle)
				.then(() => {
					this.articleIsUpdating = false
				})
				.catch((error) => {
					this.editArticleErrorMessage = error.response.data.data
					this.articleIsUpdating = false
				})
		},
		onNewArticleFileChange(event) {
			this.newArticle.image = null

			if (!event || !event.target || !event.target.files) return // Safety check

			const image = event.target.files || event.dataTransfer.files
			if (!image.length) return

			this.newArticle.image = image[0]
		}
	}
}
