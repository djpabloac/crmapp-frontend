import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

const authLink = setContext((_, { headers }) => {

    //Leer el storage
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    obtenerClientesVendedor: {
                        merge(existing, incoming) {
                            return incoming;
                        }
                    },
                    obtenerProductos: {
                        merge(existing, incoming) {
                            return incoming;
                        }
                    },
                    obtenerPedidosVendedor: {
                        merge(existing, incoming) {
                            return incoming;
                        }
                    }
                }
            }
        }
    }),
    link: authLink.concat(httpLink)
});

export default client;