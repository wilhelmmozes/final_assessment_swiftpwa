import { gql } from '@apollo/client';

export const createCharge = gql`
    mutation createCharge($token_id: String!, $amount: String!, $card_cvn: String!, $order_id: String!) {
        travelokaCharge(input: { token_id: $token_id, amount: $amount, card_cvn: $card_cvn, order_id: $order_id }) {
            status
            authorized_amount
            created
        }
    }
`;

export default {
    createCharge,
};
