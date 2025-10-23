import { INodeProperties } from 'n8n-workflow';

export const updateVacancyStatusFields: INodeProperties[] = [
  {
    displayName: 'ID Da Vaga',
    name: 'vacancyIdForStatus',
    type: 'string',
    required: true,
    default: '',
    description: 'ID da vaga que terá o status alterado. Use o endpoint "Buscar por vagas" para obter os IDs das vagas disponíveis.',
    displayOptions: { show: { operation: ['updateVacancyStatus'] } },
  },
  {
    displayName: 'Status Da Vaga',
    name: 'status',
    type: 'options',
    options: [
      { name: 'Publicada (ID: 1)', value: 1, description: 'Vaga publicada, disponível para receber novas candidaturas' },
      { name: 'Rascunho (ID: 2)', value: 2, description: 'Vaga ainda em rascunho, que não teve sua criação finalizada' },
      { name: 'Finalizada/Encerrada (ID: 3)', value: 3, description: 'Vaga que está finalizada/encerrada e não pode receber candidaturas' },
      { name: 'Congelada (ID: 4)', value: 4, description: 'Vaga que estava publicada, será congelada, para posteriormente ser finalizada' },
    ],
    required: true,
    default: 1,
    description: 'Os status de vagas possíveis são os seguintes: 1=Publicada, 2=Rascunho, 3=Finalizada/Encerrada, 4=Congelada',
    displayOptions: { show: { operation: ['updateVacancyStatus'] } },
  },
];
