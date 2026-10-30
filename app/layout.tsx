import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Perseus – The Hero | Aurelia University Hub',
  description: 'Your campus. Your people. Everything in one place. All-in-one student companion platform for Aurelia University.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

