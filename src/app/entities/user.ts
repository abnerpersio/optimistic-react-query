import { WithCacheStatus } from '../types/utils';

export type User = {
  id: string;
  name: string;
  username: string;
  blocked: boolean;
};

export type CachedUser = WithCacheStatus<User>;
