import { INodeProperties } from 'n8n-workflow';

export const viewCandidatesFields: INodeProperties[] = [
  {
    displayName: 'Application ID',
    name: 'applicationId',
    type: 'string',
    default: '',
    description: 'ID of the specific application to view. If empty, will list all applications.',
    displayOptions: { show: { operation: ['viewCandidates'] } },
  },
];
