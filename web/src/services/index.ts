import { BACKEND } from 'configs';

import Api from './api';

export const backendService = new Api({
  baseURL: BACKEND,
});
