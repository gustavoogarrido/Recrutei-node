import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class RecruteiApi implements ICredentialType {
	name = 'recruteiApi';
	displayName = 'Recrutei Credencials API';
	icon: Icon = {
    light: 'file:recrutei-bgblue-logo.svg',
    dark: 'file:recrutei-bgblue-logo.svg',
  };
	// Documentation for Recrutei API credentials
	documentationUrl = 'https://developers.recrutei.com.br/docs/getting-started';
	properties: INodeProperties[] = [
		{
			displayName: 'Authorization',
			name: 'Authorization',
			type: 'string',
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': 'Bearer {{$credentials.Authorization}}'
			}
		},
	};
}
