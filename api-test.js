const Axios = require('axios');

const domain = `tkleingers.auth0.com`;
const clientId = `i7YrTClQAYgQMnm0japcOWnpxdP4v1uY`; // application id. naos vs kleingers cap, etc
const connectionName = `Username-Password-Authentication`; // manage.auth0.com -> dashboard -> connections -> database


const axios = Axios.create({
	baseURL: `https://${domain}/`,
	timeout: 10000,
	headers: { 'content-type': `application/json`, 'accept': `application/json` }
});

axios({
	method: 'POST',
	url: '/dbconnections/signup',
	data: {
		client_id: clientId,
		email: `kleingtm@gmail.com`, //`$('#signup-email').val()`,
		password: `boguspassword`, //`$('#signup-password').val()`,
		connection: connectionName,
		user_metadata: {
			name: `Tom Kleingers`,
			app: `Gregoras`
		}
	}
}).then(response => {
	console.log(response);
})
.catch(error => {
	console.log(`error!: ${error.stack}`);
})
