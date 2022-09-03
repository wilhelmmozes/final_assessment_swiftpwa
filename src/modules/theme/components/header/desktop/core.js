/* eslint-disable no-unused-expressions */
import Router from 'next/router';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helper_cartid';
import Cookies from 'js-cookie';
import { removeCookies } from '@helper_cookies';
import { useApolloClient } from '@apollo/client';
import { localTotalCart, localCompare } from '@services/graphql/schema/local';
import firebase from 'firebase/app';
import {
    custDataNameCookie,
    features,
    modules,
} from '@config';
import {
    getCategories, getCustomer, removeToken, getVesMenu,
} from '@core_modules/theme/services/graphql';
import Content from '@core_modules/theme/components/header/desktop/components';

const CoreTopNavigation = (props) => {
    const {
        dataVesMenu: propsVesMenu, storeConfig, t, app_cookies, isLogin, showGlobalPromo,
        enablePopupInstallation, installMessage, isHomepage,
    } = props;
    let data = propsVesMenu;
    let loading = !propsVesMenu;
    if (!data && storeConfig && storeConfig.pwa) {
        const { data: dataVesMenu, loading: loadingVesMenu } = storeConfig.pwa.ves_menu_enable
            ? getVesMenu({
                variables: {
                    alias: storeConfig.pwa.ves_menu_alias,
                },
            })
            : getCategories();
        data = dataVesMenu;
        loading = loadingVesMenu;
    }
    const [value, setValue] = React.useState('');
    const [deleteTokenGql] = removeToken();
    let customerData = {};
    if (isLogin && typeof window !== 'undefined') {
        const customer = getCustomer();
        if (customer.data) {
            customerData = customer.data;
        }
    }
    const client = useApolloClient();

    const handleLogout = async () => {
        window.backdropLoader(true);
        if (features.firebase.config.apiKey && features.firebase.config.apiKey !== '') {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
            }).catch(() => {
                // An error happened.
            });
        }
        await deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                removeIsLoginFlagging();
                removeCartId();
                removeCookies('uid_product_compare');
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                client.writeQuery({ query: localCompare, data: { item_count: 0 } });
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            })
            .catch(() => {
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            });
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            Router.push(`/catalogsearch/result?q=${value}`);
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            Router.push(`/catalogsearch/result?q=${value}`);
        }
    };
    return (
        <Content
            t={t}
            isLogin={isLogin}
            data={data}
            loading={loading}
            storeConfig={storeConfig}
            handleSearch={handleSearch}
            searchByClick={searchByClick}
            setValue={setValue}
            customer={customerData}
            handleLogout={handleLogout}
            value={value}
            app_cookies={app_cookies}
            showGlobalPromo={showGlobalPromo}
            modules={modules}
            enablePopupInstallation={enablePopupInstallation}
            installMessage={installMessage}
            isHomepage={isHomepage}
        />
    );
};

export default CoreTopNavigation;
