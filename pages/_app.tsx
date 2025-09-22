// pages/_app.tsx
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import '@/styles/globals.css'

// ✅ Next.js optimized font
const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        {/* Global SEO + responsive meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Gada Vault - Marketplace for authentic African traditional products."
        />
        <title>Gada Vault</title>
      </Head>

      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
