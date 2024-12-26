import { User } from '../entities/user';
import { sleep } from '../lib/utils';

export const listUsers = async (): Promise<User[]> => {
  await sleep(1000);

  const result = await fetch('http://localhost:3001/users');
  return await result.json();
};

export type CreateUserDTO = Omit<User, 'id'>;

export const createUser = async (data: CreateUserDTO): Promise<User> => {
  await sleep(1000);

  const result = await fetch('http://localhost:30012/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await result.json();
};

export type UpdateUserDTO = Partial<Omit<User, 'id'>>;

export const updateUser = async (
  id: string,
  data: UpdateUserDTO
): Promise<User> => {
  await sleep(1000);

  const result = await fetch(`http://localhost:3001/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await result.json();
};
