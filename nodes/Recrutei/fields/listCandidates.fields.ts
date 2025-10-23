import { INodeProperties } from 'n8n-workflow';

export const listCandidatesFields: INodeProperties[] = [
  {
    displayName: 'IDs Das Vagas',
    name: 'vacancyIds',
    type: 'string',
    required: true,
    default: '',
    description: 'Lista de números inteiros para identificação de vagas. Separe os IDs por vírgula. Exemplo: "123, 456, 789"',
    displayOptions: { show: { operation: ['listCandidates'] } },
  },
  {
    displayName: 'IDs Das Etapas (Pipes)',
    name: 'pipeIds',
    type: 'string',
    default: '',
    description: 'Lista de números inteiros para identificação de Etapas do processo seletivo. Separe os IDs por vírgula. Exemplo: "1, 2, 3"',
    displayOptions: { show: { operation: ['listCandidates'] } },
  },
  {
    displayName: 'Página Atual',
    name: 'page',
    type: 'number',
    default: 1,
    description: 'Número da página atual para paginação',
    displayOptions: { show: { operation: ['listCandidates'] } },
  },
  {
    displayName: 'Candidatos Por Página',
    name: 'perPage',
    type: 'number',
    default: 20,
    description: 'Número máximo de candidatos por página',
    displayOptions: { show: { operation: ['listCandidates'] } },
  },
];
