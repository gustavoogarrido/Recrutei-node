import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	IExecuteFunctions,
	INodeExecutionData,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

// Importação dos campos separados
import { loginFields } from './fields/login.fields';
import { getVacancyFields } from './fields/getVacancy.fields';
import { updateVacancyStatusFields } from './fields/updateVacancyStatus.fields';
import { createVacancyFields } from './fields/createVacancy.fields';
import { listCandidatesFields } from './fields/listCandidates.fields';
import { viewCandidatesFields } from './fields/viewCandidates.fields';

export class Recrutei implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Recrutei',
		name: 'recrutei',
		icon: 'file:recrutei-bgblue-logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Recrutei API',
		documentationUrl: 'https://developers.recrutei.com.br/docs/getting-started#',
		defaults: {
			name: 'Recrutei',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
	       credentials: [
		       {
			       name: 'recruteiApi',
			       required: false,
			       displayOptions: {
				       show: {
					       operation: ['createVacancy', 'getVacancy', 'updateVacancyStatus', 'listDepartments', 'listRegimes', 'listJobboards', 'listClients', 'listPipes', 'listRequestReasons', 'listManagers', 'listCandidates', 'viewCandidates'],
				       },
			       },
		       },
	       ],
	       properties: [
		       {
			       displayName: 'Operation',
			       name: 'operation',
			       type: 'options',
			       noDataExpression: true,
			       options: [
				       {
					       name: 'Atualizar Status Da Vaga',
					       value: 'updateVacancyStatus',
					       description: 'Update vacancy status',
					       action: 'Update vacancy status',
				       },
				       {
					       name: 'Buscar Por Vagas',
					       value: 'getVacancy',
					       description: 'Get a specific vacancy by ID',
					       action: 'Get a vacancy',
				       },
				       {
					       name: 'Criar Uma Vaga',
					       value: 'createVacancy',
					       description: 'Create a new job vacancy',
					       action: 'Create a vacancy',
				       },
				       {
					       name: 'Listando Candidatos',
					       value: 'listCandidates',
					       description: 'List candidates for a vacancy in the company account',
					       action: 'List candidates',
				       },
				       {
					       name: 'Listando Clientes',
					       value: 'listClients',
					       description: 'List all clients registered in the company account',
					       action: 'List clients',
				       },
				       {
					       name: 'Listando Departamentos',
					       value: 'listDepartments',
					       description: 'List all registered departments',
					       action: 'List departments',
				       },
				       {
					       name: 'Listando Fluxos (Pipes)',
					       value: 'listPipes',
					       description: 'List all pipes/flows registered in the company account',
					       action: 'List pipes',
				       },
				       {
					       name: 'Listando Jobboards',
					       value: 'listJobboards',
					       description: 'List all jobboards in the company account',
					       action: 'List jobboards',
				       },
				       {
					       name: 'Listando Managers',
					       value: 'listManagers',
					       description: 'List all recruiters (managers) registered in the company account',
					       action: 'List managers',
				       },
				       {
					       name: 'Listando Motivos De Requisição',
					       value: 'listRequestReasons',
					       description: 'List all request reasons registered in the company account',
					       action: 'List request reasons',
				       },
				       {
					       name: 'Listando Regimes',
					       value: 'listRegimes',
					       description: 'List all registered regimes',
					       action: 'List regimes',
				       },
				       {
					       name: 'Obter Token',
					       value: 'login',
					       description: 'Login to Recrutei API',
					       action: 'Login',
				       },
				       {
					       name: 'Visualizando Candidatos',
					       value: 'viewCandidates',
					       description: 'View candidate data for a vacancy in the company account',
					       action: 'View candidates',
				       },
			       ],
			       default: 'login',
		       },
		       ...loginFields,
		       ...getVacancyFields,
		       ...updateVacancyStatusFields,
		       ...createVacancyFields,
		       ...listCandidatesFields,
		       ...viewCandidatesFields,
	       ],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;

			try {
				let responseData: any;

				switch (operation) {
					case 'createVacancy':
						responseData = await createVacancy.call(this, i);
						break;
					case 'getVacancy':
						responseData = await getVacancy.call(this, i);
						break;
					case 'updateVacancyStatus':
						responseData = await updateVacancyStatus.call(this, i);
						break;
					case 'login':
						responseData = await login.call(this, i);
						break;
					case 'listDepartments':
						responseData = await listDepartments.call(this, i);
						break;
					case 'listRegimes':
						responseData = await listRegimes.call(this, i);
						break;
					case 'listJobboards':
						responseData = await listJobboards.call(this, i);
						break;
					case 'listClients':
						responseData = await listClients.call(this, i);
						break;
					case 'listPipes':
						responseData = await listPipes.call(this, i);
						break;
					case 'listRequestReasons':
						responseData = await listRequestReasons.call(this, i);
						break;
					case 'listManagers':
						responseData = await listManagers.call(this, i);
						break;
					case 'listCandidates':
						responseData = await listCandidates.call(this, i);
						break;
					case 'viewCandidates':
						responseData = await viewCandidates.call(this, i);
						break;
					default:
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
				}

				returnData.push({
					json: responseData,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
							operation: operation,
							timestamp: new Date().toISOString()
						},
						pairedItem: { item: i },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}

async function createVacancy(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const title = this.getNodeParameter('title', itemIndex) as string;
	const description = this.getNodeParameter('description', itemIndex) as string;
	const companyDepartmentId = this.getNodeParameter('company_department_id', itemIndex) as number;
	const regimeId = this.getNodeParameter('regime_id', itemIndex) as number;
	const quantity = this.getNodeParameter('quantity', itemIndex) as number;
	const workload = this.getNodeParameter('workload', itemIndex) as string;

	// Validar campos obrigatórios
	if (!title || !description) {
		throw new NodeOperationError(this.getNode(), 'Title and description are required for creating a vacancy.');
	}
	if (!companyDepartmentId) {
		throw new NodeOperationError(this.getNode(), 'Company Department ID is required for creating a vacancy.');
	}
	if (!regimeId) {
		throw new NodeOperationError(this.getNode(), 'Regime ID is required for creating a vacancy.');
	}
	if (!quantity || quantity <= 0) {
		throw new NodeOperationError(this.getNode(), 'Quantity must be greater than 0 for creating a vacancy.');
	}
	if (!workload) {
		throw new NodeOperationError(this.getNode(), 'Workload is required for creating a vacancy.');
	}

	// Obter parâmetros opcionais
	const clientId = this.getNodeParameter('client_id', itemIndex) as number | null;
	const requestReasonId = this.getNodeParameter('request_reason_id', itemIndex) as number;
	const city = this.getNodeParameter('city', itemIndex) as string;
	const state = this.getNodeParameter('state', itemIndex) as string;
	const country = this.getNodeParameter('country', itemIndex) as string;
	const skills = this.getNodeParameter('skills', itemIndex) as string;
	const benefits = this.getNodeParameter('benefits', itemIndex) as string;
	const internalCode = this.getNodeParameter('internal_code', itemIndex) as string;
	const timeToHire = this.getNodeParameter('time_to_hire', itemIndex) as string;
	const managers = this.getNodeParameter('managers', itemIndex) as string;
	const internalInformation = this.getNodeParameter('internal_information', itemIndex) as string;

	// Converter managers string para array de números
	const managersArray = managers ? managers.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : [];

	const body = {
		title: title,
		description: description,
		vacancy_status_id: 1, // Sempre 1 (Publicada) conforme especificação
		pipe_id: this.getNodeParameter('pipe_id', itemIndex) as number,
		company_department_id: companyDepartmentId,
		regime_id: regimeId,
		quantity: quantity,
		workload: workload,
		remote: this.getNodeParameter('remote', itemIndex) as number,
		type: this.getNodeParameter('type', itemIndex) as string,
		fixed_remuneration: this.getNodeParameter('fixed_remuneration', itemIndex) as number,
		remuneration: this.getNodeParameter('remuneration', itemIndex) as number,
		remuneration_from: this.getNodeParameter('remuneration_from', itemIndex) as number,
		remuneration_to: this.getNodeParameter('remuneration_to', itemIndex) as number,
		remuneration_type: this.getNodeParameter('remuneration_type', itemIndex) as string,
		expired_at: this.getNodeParameter('expired_at', itemIndex) as string,
		external: this.getNodeParameter('external', itemIndex) as number,
		pcd: this.getNodeParameter('pcd', itemIndex) as number,
		is_inclusive: this.getNodeParameter('is_inclusive', itemIndex) as number,
		show_client: this.getNodeParameter('show_client', itemIndex) as number,
		show_remuneration: this.getNodeParameter('show_remuneration', itemIndex) as number,
		show_location: this.getNodeParameter('show_location', itemIndex) as number,
		show_regime: this.getNodeParameter('show_regime', itemIndex) as number,
		// Campos opcionais - só incluir se não estiverem vazios
		...(clientId !== null && { client_id: clientId }),
		...(requestReasonId > 0 && { request_reason_id: requestReasonId }),
		...(city && { city: city }),
		...(state && { state: state }),
		...(country && { country: country }),
		...(skills && { skills: skills }),
		...(benefits && { benefits: benefits }),
		...(internalCode && { internal_code: internalCode }),
		...(timeToHire && { time_to_hire: timeToHire }),
		...(managersArray.length > 0 && { managers: managersArray }),
		...(internalInformation && { internal_information: internalInformation }),
	};

	const response = await this.helpers.requestWithAuthentication.call(this, 'recruteiApi', {
		method: 'POST',
		url: 'https://api.recrutei.com.br/api/v1/vacancies',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		body: body,
	});

	return response;
}

async function login(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const email = this.getNodeParameter('email', itemIndex) as string;
	const password = this.getNodeParameter('password', itemIndex) as string;
	const xApiKey = this.getNodeParameter('xApiKey', itemIndex) as string;
	const xApiSecret = this.getNodeParameter('xApiSecret', itemIndex) as string;

	// Validar parâmetros obrigatórios
	if (!email || !password) {
		throw new NodeOperationError(this.getNode(), 'Email and password are required for login.');
	}
	if (!xApiKey || !xApiSecret) {
		throw new NodeOperationError(this.getNode(), 'X-API-Key and X-API-Secret are required for login.');
	}

	const body = {
		email: email,
		password: password,
	};

	const response = await this.helpers.httpRequest({
		method: 'POST',
		url: 'https://api.recrutei.com.br/api/v1/login-api',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': xApiKey,
			'x-api-secret': xApiSecret,
		},
		body: JSON.stringify(body),
	});

	return response;
}

async function getVacancy(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const vacancyId = this.getNodeParameter('vacancyId', itemIndex) as string;
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	// Construir URL baseada no ID fornecido
	let url = 'https://api.recrutei.com.br/api/v1/vacancies';
	if (vacancyId && vacancyId.trim() !== '') {
		url += `/${vacancyId}`;
	}

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: url,
		headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
	});

	return response;
}

async function updateVacancyStatus(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const vacancyId = this.getNodeParameter('vacancyIdForStatus', itemIndex) as string;
	const status = this.getNodeParameter('status', itemIndex) as number;
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	// Validar parâmetros obrigatórios
	if (!vacancyId || vacancyId.trim() === '') {
		throw new NodeOperationError(this.getNode(), 'Vacancy ID is required for updating status.');
	}
	if (status === undefined || status === null) {
		throw new NodeOperationError(this.getNode(), 'Status is required for updating vacancy status.');
	}

	const body = {
		status_id: status,
	};

	const response = await this.helpers.httpRequest({
		method: 'PUT',
		url: `https://api.recrutei.com.br/api/v1/vacancies/${vacancyId}/status`,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
		body: JSON.stringify(body),
	});

	return response;
}

async function listDepartments(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: 'https://api.recrutei.com.br/api/v1/departments',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
	});

	return response;
}

async function listRegimes(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: 'https://api.recrutei.com.br/api/v1/regimes/list',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
	});

	return response;
}

async function listJobboards(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: 'https://api.recrutei.com.br/api/v1/jobboards/list',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
	});

	return response;
}

async function listClients(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: 'https://api.recrutei.com.br/api/v1/clients/list',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
	});

	return response;
}

async function listPipes(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: 'https://api.recrutei.com.br/api/v1/pipes',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
	});

	return response;
}

async function listRequestReasons(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: 'https://api.recrutei.com.br/api/v2/vacancies/request-reasons',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
	});

	return response;
}

async function listManagers(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: 'https://api.recrutei.com.br/api/v1/managers/list',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
	});

	return response;
}

async function listCandidates(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	const vacancyIds = this.getNodeParameter('vacancyIds', itemIndex) as string;
	const pipeIds = this.getNodeParameter('pipeIds', itemIndex) as string;
	const page = this.getNodeParameter('page', itemIndex) as number;
	const perPage = this.getNodeParameter('perPage', itemIndex) as number;

	// Validar parâmetros obrigatórios
	if (!vacancyIds || vacancyIds.trim() === '') {
		throw new NodeOperationError(this.getNode(), 'Vacancy IDs are required for listing candidates.');
	}

	// Converter string de IDs para array de números
	const vacancyIdArray = vacancyIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
	const pipeIdArray = pipeIds ? pipeIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : [];

	// Construir payload
	const payload = {
		vacancy_id: vacancyIdArray,
		...(pipeIdArray.length > 0 && { pipes: pipeIdArray })
	};

	// Construir query parameters
	const queryParams = `page=${page}&perPage=${perPage}`;

	const response = await this.helpers.httpRequest({
		method: 'POST',
		url: `https://api.recrutei.com.br/api/v1/search/talents?${queryParams}`,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
		body: JSON.stringify(payload),
	});

	return response;
}

async function viewCandidates(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');

	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new NodeApiError(this.getNode(), { message: 'Authorization token is required. Please configure the Recrutei API credentials.' });
	}

	const applicationId = this.getNodeParameter('applicationId', itemIndex) as string;

	// Construir URL baseada no ID fornecido
	let url = 'https://api.recrutei.com.br/api/v1/applications';
	if (applicationId && applicationId.trim() !== '') {
		url += `/${applicationId}`;
	}

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.Authorization}`,
		},
	});

	return response;
}
