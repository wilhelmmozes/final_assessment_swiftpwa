import React from 'react';
import Layout from '@layout';
import { getProducts } from '@core_modules/custom/services/graphql/index';

const Product = (props) => {
    const {Content, t} = props;
    const {data, loading} = getProducts();


    console.log(data);

    const config = {
        title: 'title popular',
        header: 'relative',
        headerTitle: 'header popular',
        headerBackIcon: 'close',
        buttomNav: false
    };

    if(loading){
        return (
            <Layout {...props} pageConfig={config}>
                <h2>load...</h2>
            </Layout>
        );
    }

    return (
        <Layout {...props} pageConfig={config}>
            <Content products={data} t={t} />
            
        </Layout>
    );
}
export default Product;