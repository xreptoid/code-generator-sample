import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { cn } from "@/lib/utils";
import { getCurrentAccount } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sample AI Code Generator",
  description: "AI code assistant with Reptoid API",
};

export default async function RootLayout({ children }) {
  const { email } = await getCurrentAccount()
  return (
    <html lang="en">
      <body className={cn(inter.className, 'px-32 py-8')}>
        <Header currentUser={email && { username: email }}/>
        <div className="mt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
