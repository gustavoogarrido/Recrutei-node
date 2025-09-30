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
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
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
