import './globals.css';

export const metadata = {
  title: 'Microfyxd',
  description: 'Operator-grade AI systems and interfaces.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
