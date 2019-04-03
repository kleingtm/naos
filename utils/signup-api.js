const Axios = require('axios');
const domain = `tkleingers.auth0.com`;
const client_id = `i7YrTClQAYgQMnm0japcOWnpxdP4v1uY`; // application id. naos vs kleingers cap, etc
const connection = `Username-Password-Authentication`; // manage.auth0.com -> dashboard -> connections -> database
const axios = Axios.create({
    baseURL: `https://${domain}/`,
    timeout: 10000,
    headers: {
        'content-type': `application/json`,
        'accept': `application/json`
    }
});
axios({
        method: 'POST',
        url: '/dbconnections/signup',
        crossDomain: true,
        data: {
            client_id,
            email: 'tom@evanstonavenue.com', //'$('#signup-email').val()',
            password: 'BogusPassword', //'$('#signup-password').val()',
            connection,
            user_metadata: {
                name: 'Tom Kleingers',
                app: 'Naos'
            }
        }
    }).then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(JSON.stringify(error.response.data));
    })