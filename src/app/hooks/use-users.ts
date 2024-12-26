import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../constants/query-keys';
import { CachedUser } from '../entities/user';
import { listUsers } from '../services/users';

export function useUsers() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.users,
    queryFn: async () => {
      return (await listUsers()) as CachedUser[];
    },
    staleTime: Infinity,
  });

  return {
    users: data ?? [],
    isLoading,
  };
}
