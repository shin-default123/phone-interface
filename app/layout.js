import './globals.css';

export const metadata = {
  title: 'iPhone Call Interface',
  description: 'iOS Call Replica - Exact match to photo',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-black text-white h-full overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}