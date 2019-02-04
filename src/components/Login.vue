<template>
	<Page actionBarHidden="true">
		<FlexboxLayout class="page">
			<StackLayout class="form">
				<Image src="~/images/logo.png" loadMode="async" class="logo"/>
				<Label class="header" text="Naos" />

				<StackLayout class="input-field" marginBottom="25">
					<TextField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="user.email" returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout class="input-field" marginBottom="25">
					<TextField ref="password" class="input" hint="Password" secure="true" v-model="user.password" :returnKeyType="isLoggingIn ? 'done' : 'next'" @returnPress="focusConfirmPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout v-show="!isLoggingIn" class="input-field">
					<TextField ref="confirmPassword" class="input" hint="Confirm password" secure="true" v-model="user.confirmPassword" returnKeyType="done" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" @tap="submit" class="btn btn-primary" />
				<Label v-show="isLoggingIn" text="Forgot your password?" class="login-label" @tap="forgotPassword" />
			</StackLayout>

			<Label class="login-label sign-up-label" @tap="toggleForm">
				<FormattedString>
					<Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Already registered?'" />
					<Span :text="isLoggingIn ? 'Sign up' : ' Login'" class="bold" />
				</FormattedString>
			</Label>
		</FlexboxLayout>
	</Page>
</template>

<script lang='js'>

	import AuthService from "../services/auth.service";

	export default {
		data() {
			return {
				isLoggingIn: true, // logging in vs signing up. default to logging in
				user: {
					email: "",
					password: "",
					confirmPassword: ""
				}
			};
		},
		methods: {
			toggleForm() {
				this.isLoggingIn = !this.isLoggingIn;
			},
			submit() {
				if (!this.user.email || !this.user.password) {
					this.alert("Please provide both an email address and password.");
					return;
				}
				this.isLoggingIn ? this.login() : this.register();
			},
			login() {
				console.log(this.user);
				AuthService.login(this.user)
				.then(() => {
					this.$store.dispatch("hasLoggedIn");
					// this.$router.push("/");
					this.toggleForm();
				})
				.catch(err => {
					console.error(err);
					this.alert("Unfortunately we could not find your account.");
				});
			},
			register() {
				if (this.user.password !== this.user.confirmPassword) {
					this.alert("Your passwords do not match.");
					return;
				}
				console.log(`Registering with: ${JSON.stringify(this.user)}`);
				AuthService.register(this.user)
				.then(response => {
					this.alert("Your account was successfully created!\n\nPlease login.");
					this.isLoggingIn = true;
					console.log(JSON.stringify(response));
				})
				.catch(err => {
					console.error(err);
					this.alert("Unfortunately we were unable to create your account.");
				});
			},
			forgotPassword() {
				prompt({
					title: "Forgot Password",
					message:
						"Enter the email address you used to register for Naos to reset your password.",
					inputType: "email",
					defaultText: "",
					okButtonText: "Ok",
					cancelButtonText: "Cancel"
				}).then(data => {
					if (data.result) {
						AuthService.resetPassword(data.text.trim())
						.then(() => {
							this.alert(
								"Your password was successfully reset. Please check your email for instructions on choosing a new password."
							);
						})
						.catch(err => {
							console.error(err);
							this.alert(
								"Unfortunately, an error occurred resetting your password."
							);
						});
					}
				});
			},
			focusPassword() {
				this.$refs.password.nativeView.focus();
			},
			focusConfirmPassword() {
				if (!this.isLoggingIn) {
					this.$refs.confirmPassword.nativeView.focus();
				}
			},
			alert(message) {
				return alert({
					//title: "Naos",
					okButtonText: "OK",
					message: message
				});
			}
		}
	};
</script>

<style lang='scss'>
	@import "../styles/_variables";
	@import '~nativescript-theme-core/scss/_light.scss';

	.page {
		align-items: center;
		flex-direction: column;
	}
	.form {
		margin-left: 30;
		margin-right: 30;
		flex-grow: 2;
		vertical-align: middle;
	}

	.logo {
		margin-top:25;
		margin-bottom: 12;
		height: 120;
		font-weight: bold;
	}
	.header + .subtitle {
		horizontal-align: center;
		font-size: 16;
		font-weight: 600;
		margin-top: 10;
		margin-bottom: 25;
		text-align: center;
	}
	.header {
		horizontal-align: center;
		font-size: 25;
		font-weight: 600;
		margin-bottom: 25;
		text-align: center;
	}

	.input-field {
		margin-bottom: 25;
	}
	.input {
		font-size: 18;
		placeholder-color: #A8A8A8;
	}
	.input-field .input {
		font-size: 54;
	}

	.btn-primary {
		height: 50;
		margin: 30 5 15 5;
		background-color: $color-stellar;
		border-radius: 5;
		font-size: 20;
		font-weight: 500;
	}
	.login-label {
		horizontal-align: center;
		color: $color-subtitle;
		font-size: 16;
	}
	.sign-up-label {
		margin-bottom: 20;
	}
	.bold {
		color: #000000;
	}
</style>