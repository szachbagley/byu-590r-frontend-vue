<template>
	<div class="login-page-content">
		<div class="login-box">
			<h1 class="logo-area">Login Here</h1>
			<div class="input-container">
				<v-form v-model="isFormValid">
					<div class="input-container">
						<v-text-field
							v-model="email"
							label="Email"
							:rules="emailRules"
							hide-details="auto"
						></v-text-field>

						<v-text-field
							v-model="password"
							label="Password"
							:rules="passwordRules"
							hide-details="auto"
							type="password"
							@keyup.enter="submitLogin()"
						/>

						<v-alert
							v-if="errorMsg !== ''"
							:type="alertType"
							@click="errorMsg = ''"
						>
							{{ errorMsg }}
						</v-alert>
					</div>
				</v-form>
				<div class="button-container">
					<v-btn
						v-if="!isAuthenticated"
						:loading="isLoading"
						:disabled="!isFormValid"
						@click="submitLogin()"
					>
						Login
					</v-btn>
					<v-btn @click="dialog = true">Forgot Password</v-btn>
					<v-dialog v-model="dialog" :scrim="false" persistent>
						<v-card>
							<v-card-text>
								<v-text-field
									v-model="email"
									label="Password Reset Email"
									:rules="emailRules"
									hide-details="auto"
								></v-text-field>
							</v-card-text>
							<v-card-actions>
								<v-btn variant="text" @click="dialog = false"
									>Close</v-btn
								>
								<v-btn variant="text">Submit</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-btn @click="registerDialog = true">Register</v-btn>
					<v-dialog
						v-model="registerDialog"
						:scrim="false"
						persistent
					>
						<v-card>
							<v-card-text>
								<v-form v-model="isRegisterFormValid">
									<v-text-field
										v-model="registerName"
										label="Name"
										:rules="nameRules"
										hide-details="auto"
									></v-text-field>
									<v-text-field
										v-model="registerEmail"
										label="Email"
										:rules="emailRules"
										hide-details="auto"
									></v-text-field>
									<v-text-field
										v-model="registerPassword"
										label="Password"
										:rules="passwordRules"
										hide-details="auto"
										type="password"
									></v-text-field>
									<v-text-field
										v-model="registerConfirmPassword"
										label="Confirm Password"
										:rules="confirmPasswordRules"
										hide-details="auto"
										type="password"
									></v-text-field>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-btn
									variant="text"
									@click="registerDialog = false"
									>Close</v-btn
								>
								<v-btn
									variant="text"
									:disabled="!isRegisterFormValid"
									@click="submitRegister()"
									>Submit</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./LoginView.ts" />

<style src="./LoginView.scss" />
