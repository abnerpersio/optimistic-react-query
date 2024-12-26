import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants/query-keys';
import { User } from '../entities/user';
import { updateUser, UpdateUserDTO } from '../services/users';

type Input = {
  id: string;
  data: UpdateUserDTO;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (input: Input) => updateUser(input.id, input.data),
    onMutate: (variables) => {
      const previousUsers = queryClient.getQueryData<User[]>(queryKeys.users);

      queryClient.setQueryData<User[]>(queryKeys.users, (old) =>
        old?.map((user) => {
          if (user.id === variables.id) {
            return { ...user, ...variables.data };
          }

          return user;
        })
      );

      return { previousUsers };
    },
    onError: async (_, __, context) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users });

      queryClient.setQueryData<User[]>(queryKeys.users, context?.previousUsers);
    },
  });

  return {
    updateUser: mutateAsync,
    isLoading: isPending,
  };
}
