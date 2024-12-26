import { ThemeProvider } from '@/app/contexts/theme';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { UserForm } from '@/components/user-form';
import { UsersList } from '@/components/users-list';
import { QueryProvider } from './providers/query';

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <div className="max-w-[500px] mx-auto mt-20">
          <Header />

          <main className="mt-10 space-y-3">
            <UserForm />

            <UsersList />
          </main>
        </div>

        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  );
}
