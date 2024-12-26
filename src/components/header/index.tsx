import { ThemeSwitcher } from '../theme-switcher';

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <h1 className="font-bold text-3xl -tracking-wider">theusers</h1>
        <span className="text-muted-foreground">Gerencie os seus usuários</span>
      </div>

      <ThemeSwitcher />
    </header>
  );
}
