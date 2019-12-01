import { UserInterface } from '../interfaces/user';

// eslint-disable-next-line import/prefer-default-export
export function formatAgentName(agent: UserInterface): string {
  return `${agent.firstName} ${agent.lastName}`;
}
