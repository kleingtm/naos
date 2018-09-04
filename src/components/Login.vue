<template>
	<Page>
		<FlexboxLayout class="page">
			<StackLayout class="form">
				<Image src="~/images/naos-logo-3d-md.png" loadMode="async" class="logo"/>
				<Label class="header" text="Naos" />
				<Label class="subtitle" text="A better Stellar wallet" />

				<StackLayout class="input-field" marginBottom="25">
					<TextField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="user.email"
							   returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout class="input-field" marginBottom="25">
					<TextField ref="password" class="input" hint="Password" secure="true" v-model="user.password" :returnKeyType="isLoggingIn ? 'done' : 'next'"
							   @returnPress="focusConfirmPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout v-show="!isLoggingIn" class="input-field">
					<TextField ref="confirmPassword" class="input" hint="Confirm password" secure="true" v-model="user.confirmPassword" returnKeyType="done"
							   fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" @tap="submit" class="btn btn-primary m-t-20" />
				<Label v-show="isLoggingIn" text="Forgot your password?" class="login-label" @tap="forgotPassword" />
			</StackLayout>

			<Label class="login-label sign-up-label" @tap="toggleForm">
				<FormattedString>
					<Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'" />
					<Span :text="isLoggingIn ? 'Sign up' : ''" class="bold" />
				</FormattedString>
			</Label>
		</FlexboxLayout>
	</Page>
</template>

<script>
import UserService from "../services/user.service";

export default {
  data() {
    return {
      isLoggingIn: true, // as opposed to registering.
      user: {
        email: "foo@foo.com",
        password: "foo",
        confirmPassword: "foo"
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

      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },
    login() {
      console.log(this.user);
      UserService.login(this.user)
        .then(() => {
          this.$store.dispatch("hasLoggedIn");
          this.$router.push("/");
        })
        .catch(err => {
          console.error(err);
          this.alert("Unfortunately we could not find your account.");
        });
    },
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        return;
      }
      UserService.register(this.user)
        .then(() => {
          this.alert("Your account was successfully created.");
          this.isLoggingIn = true;
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
          UserService.resetPassword(data.text.trim())
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
        title: "Naos",
        okButtonText: "OK",
        message: message
      });
    }
  }
};
</script>

<style lang='scss'>
@import "../styles/_variables";

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
  margin-bottom: 12;
  height: 150;
  font-weight: bold;
}
.header + .subtitle {
  horizontal-align: center;
  font-size: 16;
  font-weight: 600;
  margin-top: 10;
  margin-bottom: 70;
  text-align: center;
}
.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  text-align: center;
}

.input-field {
  margin-bottom: 25;
}

.btn-primary {
  height: 50;
  margin: 30 5 15 5;
}
.login-label {
  horizontal-align: center;
  color: #a8a8a8;
  font-size: 16;
}
.sign-up-label {
  margin-bottom: 20;
}
</style>
