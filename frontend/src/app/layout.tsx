'use client'

import "../styles/globals.css"
import { Header } from "../components/Header"
import { Provider } from 'react-redux';
import { store } from '@/store'

const RootLayout = ({ children }: Readonly<{children: React.ReactNode}>) => {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>NutriMate</title>
        </head>
        <body>
          <Header />
          {children}
        </body>
      </html>
    </Provider>
  );
}

export default RootLayout