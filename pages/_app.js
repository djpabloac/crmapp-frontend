import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
