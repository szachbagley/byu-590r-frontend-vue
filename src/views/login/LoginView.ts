import axios from "axios"

export default {
	name: "LoginView",
	emits: ["authenticate"],
	data: function () {
		return {
			isAuthenticated: false,
			alertType: "error",
			errorMsg: "",
			email: "",
			password: "",
			dialog: false,
			isLoading: false,
			emailRules: [
				(value) => !!value || "E-mail is required",
				(value) =>
					(value && value.length >= 3) ||
					"E-mail must be at least 3 characters"
			],
			passwordRules: [
				(value) => !!value || "Password is required",
				(value) =>
					(value && value.length >= 8) ||
					"Password must be at least 8 characters"
			],
			isFormValid: false,
			hardCodedEmailForDemo: "test@test.com",
			hardCodedPasswordForDemo: "test1234",
			registerDialog: false,
			isRegisterFormValid: false,
			registerName: "",
			registerEmail: "",
			registerPassword: "",
			registerConfirmPassword: "",
			nameRules: [
				(value) => !!value || "Name is required",
				(value) =>
					(value && value.length >= 3) ||
					"Name must be at least 3 characters"
			],
			confirmPasswordRules: [
				(value) => !!value || "Confirm Password is required",
				(value) =>
					(value && value === this.registerPassword) ||
					"Passwords must match"
			]
		}
	},
	methods: {
		submitLogin() {
			if (!this.isFormValid) {
				return
			}
			const user = {
				email: this.email,
				password: this.password
			}
			this.errorMsg = ""
			this.isLoading = true
			this.$store.dispatch("auth/login", user).then(
				() => {
					setTimeout(() => {
						window.location.reload()
					}, 2000)
				},
				(error) => {
					this.isLoading = false
					this.errorMsg =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)
		},

		forgotPassword() {
			console.log("here")
		},
		submitRegister() {
			if (!this.isRegisterFormValid) {
				return
			}

			const register = {
				name: this.registerName,
				email: this.registerEmail,
				password: this.registerPassword,
				c_password: this.registerConfirmPassword
			}

			this.registerFormIsLoading = true
			this.$store.dispatch("auth/register", register).then(
				() => {
					alert("success!")
					this.registerFormIsLoading = false
					this.registerDialog = false
				},
				(error) => {
					this.registerFormIsLoading = false
					alert("error!")
				}
			)
		}
	}
}
