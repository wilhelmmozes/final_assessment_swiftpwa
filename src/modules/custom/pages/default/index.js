import dynamic from 'next/dynamic';
import Core from './core';
import { withApollo } from '@lib_apollo';
import { withTranslation } from '@i18n';
import Content from '@core_modules/custom/pages/default/components';


// const Content = dynamic(() => import('@core_modules/popular/pages/default/components'), {ssr: false});
const Page = (props) => (
    <Core {...props} Content={Content} />
);
// const Page = (props) => <Core {...props} Content={Content}/>;

// Page.getInitialProps = async (ctx) => ({
//     withAuth: true,
//     query: ctx.query,
// })

export default withApollo({ ssr: true })(withTranslation()(Page));