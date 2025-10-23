import { INodeProperties } from 'n8n-workflow';

export const getVacancyFields: INodeProperties[] = [
  {
    displayName: 'Vacancy ID',
    name: 'vacancyId',
    type: 'string',
    default: '',
    description: 'ID of the vacancy to retrieve. If empty, will get all vacancies.',
    displayOptions: { show: { operation: ['getVacancy'] } },
  },
];
