import { useCreateUser } from '@/app/hooks/use-create-user';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function UserForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const { createUser } = useCreateUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setName('');
      setUsername('');
      await createUser({ name, username, blocked: false });
    } catch {
      toast.error('Erro ao cadastrar usuário');
    }
  };

  return (
    <form className="bg-muted/50 p-4 rounded-md" onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <Input
          placeholder="Nome do usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="@ no Github"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <Button className="mt-4 w-full">Cadastrar</Button>
    </form>
  );
}
