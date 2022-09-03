/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import Box from '@material-ui/core/Box';

import { getLoginInfo } from '@helper_auth';

import Typography from '@common_typography';
import propTypes from 'prop-types';
import useStyles from '@core_modules/theme/components/header/mobile/style';
import { getAppEnv } from '@root/core/helpers/env';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';
import { getCategories, getVesMenu } from '@core_modules/theme/services/graphql/index';

const BurgerMenu = dynamic(() => import('@core_modules/theme/components/header/mobile/BurgerMenu'), { ssr: true });

const Header = ({ LeftComponent, CenterComponent, RightComponent, className, pageConfig, storeConfig }) => {
    const styles = useStyles();
    const router = useRouter();
    const back = () => {
        if (modules.checkout.checkoutOnly) {
            window.location.replace(getStoreHost(getAppEnv()));
        } else if (sessionStorage.getItem('prevUrl') === '/') {
            router.push('/');
        } else {
            router.back();
        }
    };
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const vesMenu = storeConfig && storeConfig.pwa && storeConfig.pwa?.ves_menu_enable;
    const logoUrl = `${storeConfig && storeConfig.secure_base_media_url}logo/${storeConfig && storeConfig.header_logo_src}`;

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    if (storeConfig && storeConfig.pwa && storeConfig.pwa.mobile_navigation === 'burger_menu' && pageConfig.pageType !== 'checkout') {
        const { loading, data, error } = getCategories();
        const { loading: loadingVesMenu, data: dataVesMenu, error: errorVesMenu } = getVesMenu({
            variables: {
                alias: storeConfig?.pwa?.ves_menu_alias,
            },
            skip: !storeConfig,
        });

        const [openModal, setOpenModal] = React.useState(false);
        const handleOpenModal = (val) => {
            setOpenModal(val);
        };

        let isLogin = 0;
        if (typeof window !== 'undefined') {
            isLogin = getLoginInfo();
        }

        const TabPanel = (props) => {
            const { children, value, index, ...other } = props;

            return (
                <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
                    {value === index && (
                        <Box p={3}>
                            <Typography>{children}</Typography>
                        </Box>
                    )}
                </div>
            );
        };

        const a11yProps = (index) => ({
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        });

        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const burgerProps = {
            isLogin,
            styles,
            logoUrl,
            toggleDrawer,
            openModal,
            handleOpenModal,
            storeConfig,
            router,
            a11yProps,
            value,
            drawerOpen,
            setDrawerOpen,
            data,
            loading,
            error,
            vesMenu,
            dataVesMenu,
            loadingVesMenu,
            errorVesMenu,
            TabPanel,
            handleChange,
            pwaStoreConfig: storeConfig,
        };

        return <BurgerMenu {...burgerProps} />;
    }

    if (pageConfig && !pageConfig.header) return null;

    const position = pageConfig && pageConfig.header === 'absolute' ? styles.headerAbsolute : styles.headerRelative;

    const containerStyle = classNames(styles.container, position, className);
    return (
        <div className={containerStyle}>
            <div className={styles.leftContainer}>
                {React.isValidElement(LeftComponent) ? (
                    LeftComponent
                ) : (
                    <Button
                        onClick={(LeftComponent && LeftComponent.onClick && LeftComponent.onClick) || back}
                        className={classNames(styles.btnBack, 'header-closeBtn')}
                    >
                        {pageConfig.headerBackIcon && pageConfig.headerBackIcon === 'close' ? (
                            <CloseIcon className={styles.backIcon} />
                        ) : (
                            <ArrowBack className={styles.backIcon} />
                        )}
                    </Button>
                )}
            </div>
            <div className={styles.centerContainer}>
                {React.isValidElement(CenterComponent) ? (
                    CenterComponent
                ) : (
                    <>
                        {pageConfig.headerTitle ? (
                            <Typography variant="h1" type="bold" letter="uppercase" align="center" className={styles.title}>
                                {pageConfig.headerTitle}
                            </Typography>
                        ) : null}
                    </>
                )}
            </div>
            <div className={styles.rightContainer}>{React.isValidElement(RightComponent) ? RightComponent : null}</div>
        </div>
    );
};

Header.propTypes = {
    LeftComponent: propTypes.any,
    CenterComponent: propTypes.any,
    RightComponent: propTypes.any,
    className: propTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    pageConfig: propTypes.object,
};

Header.defaultProps = {
    LeftComponent: null,
    CenterComponent: null,
    RightComponent: null,
    className: '',
    pageConfig: {
        header: 'relative',
    },
};

export default Header;
