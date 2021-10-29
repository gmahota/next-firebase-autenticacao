import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import AuthProvider from '../context/AuthContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <AuthProvider>
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </AuthProvider>
  )
}

export default MyApp
