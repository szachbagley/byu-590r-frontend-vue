import { createStore } from "vuex"
import { auth } from "./auth.module"
import { user } from "./user.module"
import { article } from "./article.module"
const store = createStore({
	modules: {
		auth,
		user,
		article
	}
})

export default store
