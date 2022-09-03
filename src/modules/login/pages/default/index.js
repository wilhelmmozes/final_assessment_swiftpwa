import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import Core from '@core_modules/login/pages/default/core';

const Content = dynamic(() => import('@core_modules/login/pages/default/components'), { ssr: false });

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async (ctx) => ({
    namespacesRequired: ['common', 'validate', 'login'],
    withAuth: true,
    query: ctx.query,
});

export default withApollo({ ssr: true })(withTranslation()(Page));
