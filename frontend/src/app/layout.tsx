import "../styles/globals.css";

const RootLayout = ({ children }: Readonly<{children: React.ReactNode}>) => {
  return (
    <html lang="en">
      <head>
        <title>NutriMate</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout