export type CommandResponseStatus = 'success' | 'error';

export interface CommandResponseSuccess {
  status: 'success';
}

export interface CommandResponseError {
  status: 'error';
  message: string;
  fields?: string[];
}

export type CommandResponse = CommandResponseSuccess | CommandResponseError;
