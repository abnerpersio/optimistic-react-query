import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants/query-keys';
import { CachedUser } from '../entities/user';
import { createUser } from '../services/users';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onMutate: (variables) => {
      const tmpUserId = window.crypto.randomUUID();

      queryClient.setQueryData<CachedUser[]>(queryKeys.users, (old) =>
        old?.concat({
          ...variables,
          id: tmpUserId,
          status: 'pending',
        })
      );

      return { tmpUserId };
    },
    onSuccess: async (data, _, context) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users });

      queryClient.setQueryData<CachedUser[]>(queryKeys.users, (old) =>
        old?.map((user) => {
          if (user.id === context.tmpUserId) {
            return data;
          }

          return user;
        })
      );
    },
    onError: async (_, __, context) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users });

      queryClient.setQueryData<CachedUser[]>(queryKeys.users, (old) =>
        old?.map((user) => {
          if (user.id === context?.tmpUserId) {
            return { ...user, status: 'error' };
          }

          return user;
        })
      );
    },
  });

  return {
    createUser: mutateAsync,
    isLoading: isPending,
  };
}
