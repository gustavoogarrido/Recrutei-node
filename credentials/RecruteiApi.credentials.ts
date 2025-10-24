import {
	ICredentialType,
	INodeProperties,
	Icon,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class RecruteiApi implements ICredentialType {
	name = 'recruteiApi';
	displayName = 'Recrutei API Credentials API';
	icon: Icon = {
    light: 'file:recrutei-bgblue-logo.svg',
    dark: 'file:recrutei-bgblue-logo.svg',
  };
	// Documentation for Recrutei API credentials
	documentationUrl = 'https://developers.recrutei.com.br/docs/getting-started';
	properties: INodeProperties[] = [
		{
			displayName: 'X-API-Key',
			name: 'xApiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API Key for Recrutei authentication. Get it from Settings > API in your Recrutei account.',
		},
		{
			displayName: 'X-API-Secret',
			name: 'xApiSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API Secret for Recrutei authentication. Get it from Settings > API in your Recrutei account.',
		},
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			placeholder: 'user@company.com',
			default: '',
			required: true,
			description: 'Email address of the user account for authentication.',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Password for the user account.',
		},
	];
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.recrutei.com.br/api/v1',
			url: '/login-api',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': '={{$credentials.xApiKey}}',
				'x-api-secret': '={{$credentials.xApiSecret}}',
			},
			body: {
				email: '={{$credentials.email}}',
				password: '={{$credentials.password}}',
			},
		},
	};
}
