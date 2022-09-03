import {gql} from '@apollo/client';
export const getProductSchema = gql`
    query GetProducts {
        products(search: "", sort: {
            relevance: DESC
            }
        ){
            total_count
            items{
                uid
                name
                sku
                url_key
                small_image{
                    url
                    label
                }
                price_range{
                    minimum_price{
                        final_price{
                            currency
                            value
                        }
                    }
                }
            }
        }
    }
`;