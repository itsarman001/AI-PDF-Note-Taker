import './globals.css';
import { Outfit } from 'next/font/google';
// Convex Provider
import ConvexClientProvider from "./ConvexClientProvider"; // Use named import
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'AI PDF Note Taker',
  description: 'An AI-powered application to upload, read, and manage PDFs, take notes, and ask questions with intelligent answers directly from the PDF content. Features free and premium access with a secure PayPal payment gateway.',
};


const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
