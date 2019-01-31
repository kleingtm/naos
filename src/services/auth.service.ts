/* register: https://auth0.com/docs/libraries/custom-signup#1-create-a-signup-form-to-capture-custom-fields */
export interface UiRegisterInput { // dictated by login ns template
  email: string,
  password: string,
  confirmPassword: string
}

export interface Auth0UserMeta {
  name: string,
  signup_app: string
}

export interface Auth0RegisterResponse { // dictated by auth0 api
  _id?: string,
  email_verified?:boolean,
  email?:string,
  userMeta?: Auth0UserMeta
}

class AuthService {


  protected domain:string = `tkleingers.auth0.com`;
  protected clientId:string = `i7YrTClQAYgQMnm0japcOWnpxdP4v1uY`; // application id. Naos vs kleingers cap, etc
  protected connectionName:string = `Username-Password-Authentication`; // manage.auth0.com -> dashboard -> connections -> database
  protected http = require(`tns-core-modules/http`); // you can't use request / axios. You have to use the tns-core http

  // public axios:AxiosInstance;
  //

  // constructor() {
  //   this.axios = Axios.create({
  //     baseURL: `https://${this.domain}/`,
  //     timeout: 5000,
  //     headers: { 'content-type': `application/json`, 'accept': `application/json` }
  //   });
  // }


  async register(user:UiRegisterInput): Promise<Auth0RegisterResponse> {

    /** Example:
     *
     *  curl --request POST \
     *  --url 'https://tkleingers.auth0.com/dbconnections/signup' \
     *  --header 'content-type: application/json' \
     *  --data '{"clientId": "i7YrTClQAYgQMnm0japcOWnpxdP4v1uY","email": "kleingtm@gmail.com","password": "boguspwd","connection": "Username-Password-Authentication","userMeta": {"name": "john","color": "red"}}'
     *
     **/
//console.log(`Registering with: ${JSON.stringify(this.user)}`);
    const config = {
      method: `POST`,
      url: `https://${this.domain}/dbconnections/signup`,
      headers: { 'content-type': `application/json`, 'accept': `application/json` },
      content: JSON.stringify({
        client_id: this.clientId,
        email: user.email, //`$('#signup-email').val()`,
        password: user.password, //`$('#signup-password').val()`,
        connection: this.connectionName,
        user_metadata: {
          name: `Tom Kleingers`,
          app: `Naos`
        }
      })
    };

    console.log(JSON.stringify(config));

    return this.http.request(config) as any
  }


  async login (user:any): Promise<any> {
    //this.auth0.authorize();
  }

  resetPassword(email) {
    return Promise.resolve(email);
  }

}


export default (new AuthService());