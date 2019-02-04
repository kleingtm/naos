/* register: https://auth0.com/docs/libraries/custom-signup#1-create-a-signup-form-to-capture-custom-fields */
import Axios, { AxiosInstance } from 'axios';

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
	protected clientId:string = `i7YrTClQAYgQMnm0japcOWnpxdP4v1uY`; // application id. gregoras vs kleingers cap, etc
	protected connectionName:string = `Username-Password-Authentication`; // manage.auth0.com -> dashboard -> connections -> database

	public axios:AxiosInstance;


	constructor() {
		this.axios = Axios.create({
			baseURL: `https://${this.domain}/`,
			timeout: 5000,
			headers: { 'content-type': `application/json`, 'accept': `application/json` }
		});
	}

	async register(user:UiRegisterInput): Promise<Auth0RegisterResponse> {
		const config = {
			method: `POST`,
			url: `/dbconnections/signup`,
			data: {
				client_id: this.clientId,
				email: user.email,
				password: user.password,
				connection: this.connectionName,
				user_metadata: {
					name: `Tom Kleingers`,
					app: `Naos`
				}
			}
		};
		return this.axios(config) as any;
	}


	async login (user:any): Promise<any> {
		//this.auth0.authorize();
	}

	resetPassword(email) {
		return Promise.resolve(email);
	}

}


export default (new AuthService());