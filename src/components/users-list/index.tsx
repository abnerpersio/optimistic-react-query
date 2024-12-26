import { useUpdateUser } from '@/app/hooks/use-update-user';
import { useUsers } from '@/app/hooks/use-users';
import { cn } from '@/app/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { Switch } from '../ui/switch';

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { updateUser } = useUpdateUser();

  const handleBlockedChange = async (id: string, blocked: boolean) => {
    await updateUser({
      id,
      data: { blocked },
    });
  };

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <Skeleton className="h-[74px] w-full" />
          <Skeleton className="h-[74px] w-full" />
          <Skeleton className="h-[74px] w-full" />
        </>
      )}

      {!isLoading &&
        users.map((user) => (
          <div
            key={user.id}
            className={cn(
              'border p-4 rounded-md flex items-center justify-between',
              user.status === 'pending' && 'opacity-70',
              user.status === 'error' && 'border-destructive bg-destructive/10'
            )}
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`https://github.com/${user.username}.png`} />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <strong className="text-lg block leading-4">{user.name}</strong>
                <small className="text-muted-foreground">
                  @{user.username}
                </small>
              </div>
            </div>

            <Switch
              checked={user.blocked}
              disabled={user.status === 'pending' || user.status === 'error'}
              onCheckedChange={(checked) =>
                handleBlockedChange(user.id, checked)
              }
            />
          </div>
        ))}
    </div>
  );
}
