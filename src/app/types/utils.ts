export type WithCacheStatus<T> = T & { status?: 'pending' | 'error' };
