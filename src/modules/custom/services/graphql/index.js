import {useQuery} from '@apollo/client';
import {getProductSchema} from '@core_modules/custom/services/graphql/schema';

export const getProducts = () => useQuery(getProductSchema);