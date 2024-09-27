import "../styles/globals.css";
import { Header } from "../components/Header";

const RootLayout = ({ children }: Readonly<{children: React.ReactNode}>) => {
  return (
    <html lang="en">
      <head>
        <title>NutriMate</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

export default RootLayout