import { gql } from '@apollo/client';

export const NUEVA_CUENTA = gql`
    mutation nuevoUsuario($input: UsuarioInput) {
        nuevoUsuario(input: $input) {
            id
            nombre
            apellido
            email
        }
    }
`;

export const OBTENER_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
            nombre
            apellido
        }
    }
`;