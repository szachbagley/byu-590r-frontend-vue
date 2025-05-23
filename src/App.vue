<script lang="ts">
import { RouterLink, RouterView } from "vue-router"
import LoginView from "./views/login/LoginView.vue"
import { mapState } from "vuex"
import { ref } from "vue"
export default {
	setup() {
		const theme = ref("light")
		function changeTheme() {
			theme.value = theme.value === "light" ? "dark" : "light"
		}
		return { theme, changeTheme }
	},
	name: "App",
	components: {
		LoginView,
		RouterLink,
		RouterView
	},
	data: function () {
		return {
			profileDialog: false,
			profileIsUploading: false,
			verificationEmailLoading: false,
			showEmailNotVerifiedDialog: false,
			showChangeEmailTextField: false,
			changeEmail: false,
			successVerificationMessage: "",
			changeEmailRules: [
				(value) => !!value || "Required.",
				(value) => (value && value.length >= 3) || "Min 3 characters"
			],
			profile: {
				avatar: "",
				name: "",
				title: "",
				icon: "mdi-account-circle",
				color: "info"
			},
			profilePictureImage: "",
			emailOfVerification: ""
		}
	},
	computed: {
		...mapState({
			user() {
				return this.$store.state.user.user
			},
			auth() {
				return this.$store.state.auth
			},
			authUser() {
				return this.auth.user
			},
			isAuthenticated() {
				return (
					this.auth.status.loggedIn &&
					this.authUser.token !== undefined
				)
			},
			title() {
				return "Welcome " + this.authUser.name + "!"
			},
			avatarURL() {
				return this.auth.user.avatar
			},
			profilePictureChangeLabel() {
				return "Profile picture change22"
			}
		})
	},
	updated() {
		if (
			this.isAuthenticated &&
			this.$route.name !== "home" &&
			this.$route.name !== "articles"
		) {
			this.$router.push({ name: "home" })
		}
	},
	created() {
		if (this.authUser) {
			this.getCurrentUser()
		}
	},
	methods: {
		logout() {
			this.$store.dispatch("auth/logout")
		},
		checkAuth(auth) {
			console.log("Authenticated!", auth)
		},
		onAvatarChange(e) {
			var image = e.target.files || e.dataTransfer.files

			if (!image.length) return
			this.profileIsUploading = true
			this.$store
				.dispatch("user/uploadAvatar", image[0], { root: true })
				.then((response) => {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
					this.profileIsUploading = false
				})
				.catch((error) => {
					console.log(error)
					alert("Error. Try again")
					this.profileIsUploading = false
				})
		},
		removeAvatar() {
			this.profileIsUploading = true
			this.$store
				.dispatch("user/removeAvatar")
				.then((response) => {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
					this.profileIsUploading = false
				})
				.catch((error) => {
					console.log(error)
					alert("Error. Try again")
					this.profileIsUploading = false
				})
		},
		getCurrentUser() {
			this.profile.name = this.authUser.name

			this.profile.title = this.title
			this.$store
				.dispatch("user/getUser")
				.then((response) => {
					if (response.avatar) {
						console.log(response.avatar)
						this.$store.commit(
							"auth/uploadAvatarSuccess",
							response.avatar
						)
					}
				})
				.catch((error) => {
					this.logout()
				})
		}
	}
}
</script>

<template>
	<v-app :theme="theme">
		<v-app-bar v-if="isAuthenticated">
			<v-spacer></v-spacer>
			<v-btn to="home" default>Home</v-btn>
			<v-btn to="about">About</v-btn>
			<v-btn to="articles">Articles</v-btn>

			<v-menu min-width="200px" rounded>
				<template v-slot:activator="{ props }">
					<v-btn icon v-bind="props">
						<v-avatar color="brown" size="large">
							<v-img
								icon
								v-bind="props"
								v-if="avatarURL"
								alt="Avatar"
								:src="avatarURL"
							></v-img>
							<v-icon
								v-bind="props"
								v-else
								:color="profile.color"
								:icon="profile.icon"
							></v-icon>
						</v-avatar>
					</v-btn>
				</template>
				<v-card>
					<v-card-text>
						<div class="mx-auto text-center">
							<h3>{{ profile.name }}</h3>
							<v-divider class="my-3"></v-divider>
							<v-btn
								:prepend-icon="
									theme === 'light'
										? 'mdi-weather-sunny'
										: 'mdi-weather-night'
								"
								@click="changeTheme"
								>Toggle Theme
							</v-btn>
							<v-btn @click="profileDialog = true">Profile</v-btn>
							<v-divider class="my-3"></v-divider>
							<v-btn @click="logout()">Logout</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-menu>
		</v-app-bar>
		<v-main>
			<v-container>
				<div v-if="isAuthenticated">
					<RouterView />
				</div>
				<LoginView
					v-else
					:is-authenticated="isAuthenticated"
					@authenticate="checkAuth($event)"
				/>
			</v-container>

			<v-dialog v-model="profileDialog" :scrim="false" persistent>
				<v-form>
					<v-card>
						<v-card-title>Profile</v-card-title>
						<v-card-subtitle>Change your profile</v-card-subtitle>
						<v-card class="mx-auto" max-width="434" rounded="0">
							<v-img
								cover
								v-if="avatarURL"
								:src="avatarURL"
							></v-img>
							<v-icon
								v-else
								:color="profile.color"
								:icon="profile.icon"
							></v-icon>

							<v-file-input
								v-model="profilePictureImage"
								accept="image/*"
								:loading="profileIsUploading"
								:disabled="profileIsUploading"
								@change="onAvatarChange"
								:label="profilePictureChangeLabel"
							/>
							<v-card-actions>
								<v-btn @click="removeAvatar"
									>Remove Avatar</v-btn
								>
								<v-btn @click="profileDialog = false"
									>Close</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-card>
				</v-form>
			</v-dialog>
		</v-main>
	</v-app>
</template>
