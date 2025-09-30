import { 
	INodeType, 
	INodeTypeDescription, 
	NodeConnectionType,
	IExecuteFunctions,
	INodeExecutionData,
} from 'n8n-workflow';

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
						name: 'Obter token',
						value: 'login',
						description: 'Login to Recrutei API',
						action: 'Login',
					},
					{
						name: 'Criar uma vaga',
						value: 'createVacancy',
						description: 'Create a new job vacancy',
						action: 'Create a vacancy',
					},
					{
						name: 'Buscar por vagas',
						value: 'getVacancy',
						description: 'Get a specific vacancy by ID',
						action: 'Get a vacancy',
					},
					{
						name: 'Atualizar status da vaga',
						value: 'updateVacancyStatus',
						description: 'Update vacancy status',
						action: 'Update vacancy status',
					},
					{
						name: 'Listando departamentos',
						value: 'listDepartments',
						description: 'List all registered departments',
						action: 'List departments',
					},
					{
						name: 'Listando regimes',
						value: 'listRegimes',
						description: 'List all registered regimes',
						action: 'List regimes',
					},
					{
						name: 'Listando jobboards',
						value: 'listJobboards',
						description: 'List all jobboards in the company account',
						action: 'List jobboards',
					},
					{
						name: 'Listando clientes',
						value: 'listClients',
						description: 'List all clients registered in the company account',
						action: 'List clients',
					},
					{
						name: 'Listando fluxos (pipes)',
						value: 'listPipes',
						description: 'List all pipes/flows registered in the company account',
						action: 'List pipes',
					},
					{
						name: 'Listando motivos de requisição',
						value: 'listRequestReasons',
						description: 'List all request reasons registered in the company account',
						action: 'List request reasons',
					},
					{
						name: 'Listando Managers',
						value: 'listManagers',
						description: 'List all recruiters (managers) registered in the company account',
						action: 'List managers',
					},
					{
						name: 'Listando candidatos',
						value: 'listCandidates',
						description: 'List candidates for a vacancy in the company account',
						action: 'List candidates',
					},
					{
						name: 'Visualizando candidatos',
						value: 'viewCandidates',
						description: 'View candidate data for a vacancy in the company account',
						action: 'View candidates',
					},
				],
				default: 'login',
			},
			// Campos para Login
			{
				displayName: 'ℹ️ Como Obter as Chaves da API',
				name: 'apiKeysInfo',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						operation: ['login'],
					},
				},
				options: [],
				description: 'Para obter as chaves X-API-Key e X-API-Secret: 1) Acesse a conta da empresa na Recrutei com um usuário com permissão de acesso, 2) Navegue até "Configurações" > "API", 3) Os tokens da empresa estarão visíveis e disponíveis para utilização.',
			},
			{
				displayName: 'Chave da API (X-API-Key)',
				name: 'xApiKey',
				type: 'string',
				required: true,
				default: '',
				description: 'Token de identificação da empresa. Para obter: acesse a conta da empresa na Recrutei com um usuário com permissão de acesso em "Configurações" > "API". O token da empresa estará visível e disponível para utilização.',
				displayOptions: {
					show: {
						operation: ['login'],
					},
				},
			},
			{
				displayName: 'Segredo da API (X-API-Secret)',
				name: 'xApiSecret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				required: true,
				default: '',
				description: 'Token secreto de identificação da empresa. Para obter: acesse a conta da empresa na Recrutei com um usuário com permissão de acesso em "Configurações" > "API". O token secreto da empresa estará visível e disponível para utilização.',
				displayOptions: {
					show: {
						operation: ['login'],
					},
				},
			},
			{
				displayName: 'E-mail do Usuário',
				name: 'email',
				type: 'string',
				required: true,
				default: '',
				description: 'Seu endereço de e-mail ou endereço para o qual o token deve ser gerado. Deve ser um e-mail válido cadastrado na conta da empresa.',
				displayOptions: {
					show: {
						operation: ['login'],
					},
				},
			},
			{
				displayName: 'Senha do Usuário',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				required: true,
				default: '',
				description: 'Senha do endereço de e-mail enviado. Deve ser a senha associada à conta de e-mail fornecida.',
				displayOptions: {
					show: {
						operation: ['login'],
					},
				},
			},
			// Campos para Get Vacancy
			{
				displayName: 'Vacancy ID',
				name: 'vacancyId',
				type: 'string',
				required: false,
				default: '',
				description: 'ID of the vacancy to retrieve. If empty, will get all vacancies',
				displayOptions: {
					show: {
						operation: ['getVacancy'],
					},
				},
			},
			// Campos para Update Vacancy Status
			{
				displayName: 'ID da Vaga',
				name: 'vacancyIdForStatus',
				type: 'string',
				required: true,
				default: '',
				description: 'ID da vaga que terá o status alterado. Use o endpoint "Buscar por vagas" para obter os IDs das vagas disponíveis.',
				displayOptions: {
					show: {
						operation: ['updateVacancyStatus'],
					},
				},
			},
			{
				displayName: 'Status da Vaga',
				name: 'status',
				type: 'options',
				options: [
					{ 
						name: 'Publicada (ID: 1)', 
						value: 1,
						description: 'Vaga publicada, disponível para receber novas candidaturas'
					},
					{ 
						name: 'Rascunho (ID: 2)', 
						value: 2,
						description: 'Vaga ainda em rascunho, que não teve sua criação finalizada'
					},
					{ 
						name: 'Finalizada/Encerrada (ID: 3)', 
						value: 3,
						description: 'Vaga que está finalizada/encerrada e não pode receber candidaturas'
					},
					{ 
						name: 'Congelada (ID: 4)', 
						value: 4,
						description: 'Vaga que estava publicada, será congelada, para posteriormente ser finalizada'
					},
				],
				required: true,
				default: 1,
				description: 'Os status de vagas possíveis são os seguintes: 1=Publicada, 2=Rascunho, 3=Finalizada/Encerrada, 4=Congelada',
				displayOptions: {
					show: {
						operation: ['updateVacancyStatus'],
					},
				},
			},
			// Campos para Create Vacancy
			{
				displayName: 'Título da Vaga',
				name: 'title',
				type: 'string',
				required: true,
				default: '',
				description: 'Título da vaga. Exemplo: "Desenvolvedor Front-end"',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Descrição da Vaga',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				required: true,
				default: '',
				description: 'Descrição da vaga em HTML/CSS simples. Exemplo: <p><h4>Responsabilidades:</h4><ul><li>Desenvolver aplicações...</li></ul></p>',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'ID do Departamento',
				name: 'company_department_id',
				type: 'number',
				required: true,
				default: 0,
				description: 'Define qual será o departamento interno da empresa que será associado à vaga. A lista de departamentos pode ser obtida através do endpoint "Listando departamentos".',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'ID do Regime de Trabalho',
				name: 'regime_id',
				type: 'number',
				required: true,
				default: 0,
				description: 'Define qual será o regime associado à vaga. A lista de regimes possíveis pode ser obtida através do endpoint "Listando regimes".',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Quantidade de Vagas',
				name: 'quantity',
				type: 'number',
				required: true,
				default: 1,
				description: 'Define a quantidade de posições que a vaga terá. Exemplo: 5',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Carga Horária Semanal',
				name: 'workload',
				type: 'string',
				required: true,
				default: '40 horas',
				description: 'Define qual será a carga horária semanal esperada para a vaga. Exemplo: "40 horas". Para vagas PJ sem carga definida, envie apenas: "0".',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'ID do Fluxo (Pipe)',
				name: 'pipe_id',
				type: 'number',
				required: true,
				default: 0,
				description: 'ID do fluxo/kanban que a vaga utilizará. Use o endpoint "Listando fluxos (pipes)" para obter os IDs disponíveis.',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Modalidade de Trabalho',
				name: 'remote',
				type: 'options',
				options: [
					{ name: '100% Presencial', value: 0 },
					{ name: '100% Remoto', value: 1 },
					{ name: 'Presencial ou Remoto', value: 2 },
					{ name: 'Híbrido (Presencial e Remoto)', value: 3 },
				],
				required: true,
				default: 0,
				description: 'Define se a vaga será presencial, remota, híbrida ou aceita ambas as modalidades',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Tipo de Vaga',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Confidencial', value: 'Confidencial' },
					{ name: 'Pública', value: 'Pública' },
				],
				required: true,
				default: 'Pública',
				description: 'Vagas confidenciais têm acesso apenas via URL direta. Vagas públicas aparecem na página de carreiras e são enviadas às jobboards.',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Tipo de Remuneração',
				name: 'fixed_remuneration',
				type: 'options',
				options: [
					{ name: 'Faixa Salarial', value: 0 },
					{ name: 'Valor Fixo', value: 1 },
				],
				required: true,
				default: 0,
				description: 'Define se a remuneração é fixa ou uma faixa. 1 = Para remuneração fixa e direta (ex: R$ 3.000). 0 = Para remuneração em faixa (ex: "de R$3.000 até R$4.000")',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Valor da Remuneração',
				name: 'remuneration',
				type: 'number',
				default: 0,
				description: 'Informa qual será a remuneração da vaga. Este campo deve ser usado apenas quando fixed_remuneration = 1. Deve ser enviado no formato: 1500.00 ou 1500',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Remuneração Mínima',
				name: 'remuneration_from',
				type: 'number',
				default: 0,
				description: 'Informa qual será o início da faixa de remuneração da vaga. Deve ser usado apenas quando fixed_remuneration = 0. Deve ser enviado no formato: 2000.00 ou 2000',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Remuneração Máxima',
				name: 'remuneration_to',
				type: 'number',
				default: 0,
				description: 'Informa qual será o fim da faixa de remuneração da vaga. Deve ser usado apenas quando fixed_remuneration = 0. Deve ser enviado no formato: 3000.00 ou 3000',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Período da Remuneração',
				name: 'remuneration_type',
				type: 'options',
				options: [
					{ name: 'Por Hora', value: 'Hora' },
					{ name: 'Por Mês', value: 'Mês' },
					{ name: 'Por Ano', value: 'Ano' },
				],
				default: 'Mês',
				description: 'Define qual será o tipo de remuneração: por hora, por mês, ou por ano. Exemplo: "Mês". Usado para formatar a remuneração, ex: "R$ 3000.00 por mês" ou "R$ 50 por hora"',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Data de Expiração',
				name: 'expired_at',
				type: 'dateTime',
				default: '',
				description: 'Define a data de expiração da vaga. A partir desta data, a vaga não estará mais disponível para receber novas candidaturas. Exemplo: 2025-07-20',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'ID do Cliente',
				name: 'client_id',
				type: 'number',
				required: false,
				default: null,
				description: 'Define qual será o cliente que deverá ser associado à vaga, caso exista. A lista de clientes pode ser obtida através do endpoint "Listando clientes".',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'ID do Motivo da Requisição',
				name: 'request_reason_id',
				type: 'number',
				required: false,
				default: 0,
				description: 'Define qual será o motivo de requisição associado à vaga. A lista de motivos possíveis pode ser obtida através do endpoint "Listando motivos de requisição".',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Cidade',
				name: 'city',
				type: 'string',
				required: false,
				default: '',
				description: 'Define a cidade da vaga. Poderá ser NULL caso não tenha cidade definida, numa vaga remota, por exemplo. Exemplo: "Uberlândia"',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Estado (UF)',
				name: 'state',
				type: 'string',
				required: false,
				default: '',
				description: 'Define o estado da vaga, em UF. Poderá ser NULL caso não tenha estado definido, numa vaga remota, por exemplo. Exemplo: "MG"',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'País',
				name: 'country',
				type: 'string',
				required: false,
				default: '',
				description: 'Define o país da vaga. Poderá ser NULL caso não tenha país definido, numa vaga remota, por exemplo. Exemplo: "Brasil"',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Habilidades Necessárias',
				name: 'skills',
				type: 'string',
				required: false,
				default: '',
				description: 'Define a lista de habilidades necessárias para a vaga, separadas por vírgula. Exemplo: "Javascript, NodeJS, ReactJS, HTML, CSS"',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Benefícios Oferecidos',
				name: 'benefits',
				type: 'string',
				required: false,
				default: '',
				description: 'Define a lista de benefícios associados na vaga, separados por vírgula. Exemplo: "Plano de Saúde, Vale Alimentação"',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Código Interno',
				name: 'internal_code',
				type: 'string',
				required: false,
				default: '',
				description: 'Código interno da vaga para controle da empresa (opcional)',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Data Prevista para Contratação',
				name: 'time_to_hire',
				type: 'dateTime',
				required: false,
				default: '',
				description: 'Data prevista para preenchimento da vaga (SLA interno). Esta data não é compartilhada com os candidatos.',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'IDs dos Recrutadores',
				name: 'managers',
				type: 'string',
				required: false,
				default: '',
				description: 'Define qual será a equipe que será responsável pela vaga. Devem ser enviados os IDs dos managers (recrutadores) separados por vírgulas. A lista de managers pode ser obtida através do endpoint "Listando Managers". Exemplo: 1994, 2174, 2155',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Informações Internas',
				name: 'internal_information',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				required: false,
				default: '',
				description: 'Permite incluir uma observação interna qualquer que ficará associada à vaga. Exemplo: "Esta vaga deverá ser trabalhada em..."',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Vaga Externa',
				name: 'external',
				type: 'options',
				options: [
					{ name: 'Não', value: 0 },
					{ name: 'Sim', value: 1 },
				],
				required: true,
				default: 0,
				description: 'Define se é uma vaga externa (para cliente) ou interna (da própria empresa)',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Vaga para PCD',
				name: 'pcd',
				type: 'options',
				options: [
					{ name: 'Não', value: 0 },
					{ name: 'Sim', value: 1 },
				],
				required: false,
				default: 0,
				description: 'Define se a oportunidade será inclusiva para pessoas com deficiência (PCD)',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Vaga Inclusiva/Afirmativa',
				name: 'is_inclusive',
				type: 'options',
				options: [
					{ name: 'Não', value: 0 },
					{ name: 'Sim', value: 1 },
				],
				required: false,
				default: 0,
				description: 'Define se a vaga é inclusiva/afirmativa para diversidade',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Exibir Cliente',
				name: 'show_client',
				type: 'options',
				options: [
					{ name: 'Não', value: 0 },
					{ name: 'Sim', value: 1 },
				],
				required: true,
				default: 0,
				description: 'Define se o cliente associado à vaga deve ser exibido. Caso não exista um cliente associado à vaga, envie apenas 0. Exemplo: 0',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Exibir Remuneração',
				name: 'show_remuneration',
				type: 'options',
				options: [
					{ name: 'Não', value: 0 },
					{ name: 'Sim', value: 1 },
				],
				required: true,
				default: 1,
				description: 'Define se a remuneração da vaga (seja ela fixa ou uma faixa de remuneração) poderá ser visível aos candidatos ou não. Caso seja pública, envie 1. Exemplo: 1',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Exibir Localização',
				name: 'show_location',
				type: 'options',
				options: [
					{ name: 'Não', value: 0 },
					{ name: 'Sim', value: 1 },
				],
				required: true,
				default: 1,
				description: 'Define se a localização da vaga (seja presencial, remota ou híbrida) poderá ser visível aos candidatos ou não. Caso seja pública, envie 1. Exemplo: 1',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			{
				displayName: 'Exibir Regime de Trabalho',
				name: 'show_regime',
				type: 'options',
				options: [
					{ name: 'Não', value: 0 },
					{ name: 'Sim', value: 1 },
				],
				required: true,
				default: 1,
				description: 'Define se o regime da vaga (CLT, PJ, etc) poderá ser visível aos candidatos ou não. Caso seja público, envie 1. Exemplo: 1',
				displayOptions: {
					show: {
						operation: ['createVacancy'],
					},
				},
			},
			// Campos para List Candidates
			{
				displayName: 'IDs das Vagas',
				name: 'vacancyIds',
				type: 'string',
				required: true,
				default: '',
				description: 'Lista de números inteiros para identificação de vagas. Separe os IDs por vírgula. Exemplo: "123, 456, 789"',
				displayOptions: {
					show: {
						operation: ['listCandidates'],
					},
				},
			},
			{
				displayName: 'IDs das Etapas (Pipes)',
				name: 'pipeIds',
				type: 'string',
				required: false,
				default: '',
				description: 'Lista de números inteiros para identificação de Etapas do processo seletivo. Separe os IDs por vírgula. Exemplo: "1, 2, 3"',
				displayOptions: {
					show: {
						operation: ['listCandidates'],
					},
				},
			},
			{
				displayName: 'Página Atual',
				name: 'page',
				type: 'number',
				required: false,
				default: 1,
				description: 'Número da página atual para paginação',
				displayOptions: {
					show: {
						operation: ['listCandidates'],
					},
				},
			},
			{
				displayName: 'Candidatos por Página',
				name: 'perPage',
				type: 'number',
				required: false,
				default: 20,
				description: 'Número máximo de candidatos por página',
				displayOptions: {
					show: {
						operation: ['listCandidates'],
					},
				},
			},
			// Campos para View Candidates
			{
				displayName: 'Application ID',
				name: 'applicationId',
				type: 'string',
				required: false,
				default: '',
				description: 'ID of the specific application to view. If empty, will list all applications',
				displayOptions: {
					show: {
						operation: ['viewCandidates'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;

			try {
				let responseData: any;

				if (operation === 'createVacancy') {
					responseData = await createVacancy.call(this, i);
				} else if (operation === 'getVacancy') {
					responseData = await getVacancy.call(this, i);
				} else if (operation === 'updateVacancyStatus') {
					responseData = await updateVacancyStatus.call(this, i);
				} else if (operation === 'login') {
					responseData = await login.call(this, i);
				} else if (operation === 'listDepartments') {
					responseData = await listDepartments.call(this, i);
				} else if (operation === 'listRegimes') {
					responseData = await listRegimes.call(this, i);
				} else if (operation === 'listJobboards') {
					responseData = await listJobboards.call(this, i);
				} else if (operation === 'listClients') {
					responseData = await listClients.call(this, i);
				} else if (operation === 'listPipes') {
					responseData = await listPipes.call(this, i);
				} else if (operation === 'listRequestReasons') {
					responseData = await listRequestReasons.call(this, i);
				} else if (operation === 'listManagers') {
					responseData = await listManagers.call(this, i);
				} else if (operation === 'listCandidates') {
					responseData = await listCandidates.call(this, i);
				} else if (operation === 'viewCandidates') {
					responseData = await viewCandidates.call(this, i);
				} else {
					throw new Error(`Unknown operation: ${operation}`);
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
		throw new Error('Title and description are required for creating a vacancy.');
	}
	if (!companyDepartmentId) {
		throw new Error('Company Department ID is required for creating a vacancy.');
	}
	if (!regimeId) {
		throw new Error('Regime ID is required for creating a vacancy.');
	}
	if (!quantity || quantity <= 0) {
		throw new Error('Quantity must be greater than 0 for creating a vacancy.');
	}
	if (!workload) {
		throw new Error('Workload is required for creating a vacancy.');
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
		throw new Error('Email and password are required for login.');
	}
	if (!xApiKey || !xApiSecret) {
		throw new Error('X-API-Key and X-API-Secret are required for login.');
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
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
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

	// Validar parâmetros obrigatórios
	if (!vacancyId || vacancyId.trim() === '') {
		throw new Error('Vacancy ID is required for updating status.');
	}
	if (status === undefined || status === null) {
		throw new Error('Status is required for updating vacancy status.');
	}

	const body = {
		status: status,
	};

	const response = await this.helpers.requestWithAuthentication.call(this, 'recruteiApi', {
		method: 'POST',
		url: `https://api.recrutei.com.br/api/v1/vacancies/${vacancyId}/status`,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	return response;
}

async function listDepartments(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const credentials = await this.getCredentials('recruteiApi');
	
	// Validar se as credenciais existem
	if (!credentials?.Authorization) {
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
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
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
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
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
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
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
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
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
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
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
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
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
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
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
	}

	const vacancyIds = this.getNodeParameter('vacancyIds', itemIndex) as string;
	const pipeIds = this.getNodeParameter('pipeIds', itemIndex) as string;
	const page = this.getNodeParameter('page', itemIndex) as number;
	const perPage = this.getNodeParameter('perPage', itemIndex) as number;

	// Validar parâmetros obrigatórios
	if (!vacancyIds || vacancyIds.trim() === '') {
		throw new Error('Vacancy IDs are required for listing candidates.');
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
		throw new Error('Authorization token is required. Please configure the Recrutei API credentials.');
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
