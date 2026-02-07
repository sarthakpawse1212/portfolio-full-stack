import { ThemeProvider } from '../src/context/ThemeContext';
import ThemeToggle from '../src/components/ThemeToggle';

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {children}
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}