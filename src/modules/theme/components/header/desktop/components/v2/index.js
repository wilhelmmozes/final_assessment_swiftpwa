/* eslint-disable indent */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import Badge from '@material-ui/core/Badge';
import NotificationBell from '@plugin_notificationbell';
import ShoppingBagIcon from '@plugin_shoppingbag';
import ProductCompareIcon from '@core_modules/catalog/plugins/ProductCompare';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import DesktopInstallAppV2 from '@core_modules/theme/components/header/desktop/components/v2/custom-install-popup/desktop';
import Menu from '@core_modules/theme/components/header/desktop/components/v2/mcategory';
import Autocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import OptionAutocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete/view';

import SwitcherLanguage from '@common_language';
import SwitcherCurrency from '@common_currency';

const ViewTopNavigation = (props) => {
    const {
        storeConfig,
        handleSearch,
        searchByClick,
        setValue,
        value,
        data,
        loading,
        t,
        isLogin,
        handleLogout,
        showGlobalPromo,
        modules,
        vesMenuConfig,
        appName = 'Swift PWA',
        installMessage = 'Install',
        enablePopupInstallation = false,
    } = props;

    const [triger, setTriger] = React.useState(false);

    const maxHeigtToShow = 600;

    React.useEffect(() => {
        if (typeof window !== 'undefined' && storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header) {
            const header = document.getElementById('header');
            const middleSubmenu = document.getElementById('submenu-center');
            const leftSubmenu = document.getElementById('submenu-left');
            const checkScrollTop = () => {
                // handle show hide header
                if (middleSubmenu && leftSubmenu) {
                    if (window.pageYOffset > 100) {
                        middleSubmenu.classList.remove('hidden-submenu');
                        header.classList.add('header-bgcolor');
                        leftSubmenu.classList.add('hidden-submenu');
                    } else {
                        middleSubmenu.classList.add('hidden-submenu');
                        header.classList.remove('header-bgcolor');
                        leftSubmenu.classList.remove('hidden-submenu');
                    }
                }
                if (!triger && window.pageYOffset > maxHeigtToShow) {
                    setTriger(true);
                } else if (triger && window.pageYOffset < maxHeigtToShow) {
                    setTriger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [triger]);

    return (
        <>
            <div id="header">
                <main style={{ width: '100%', maxWidth: 'unset' }}>
                    <div id="submenu-center" className="header-main hidden-submenu">
                        <div className="header-middle">
                            <div className="header-middle__left">
                                <div className="box header-middle__logo">
                                    <Link href="/">
                                        <img
                                            className="header-middle__logo-link"
                                            src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="header-middle__center">
                                <div className="row menu-category">
                                    <div className="col-xs-12 menu-middle">
                                        {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                                    </div>
                                </div>
                                <div className="header-small__menu">
                                    {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                                </div>
                            </div>
                            <div className="header-middle__right">
                                <div className="box">
                                    <div className="header-middle__icons">
                                        <div className="signin">
                                            <Link href="/customer/account" passHref>
                                                <Badge color="secondary">
                                                    <PersonIcon color="secondary" />
                                                </Badge>
                                            </Link>
                                        </div>
                                        <div className="notification">
                                            <NotificationBell withLink />
                                        </div>
                                        {modules.productcompare.enabled && (
                                            <div className="shopping-bag">
                                                <ProductCompareIcon withLink isLogin={isLogin} />
                                            </div>
                                        )}
                                        <div id="header-shoppingBag-icon" className="shopping-bag">
                                            <ShoppingBagIcon withLink storeConfig={storeConfig} />
                                        </div>
                                    </div>
                                    <div className="header-middle__search margin-top-1rem">
                                        <Autocomplete setValue={setValue} handleSearch={handleSearch} OptionsItem={OptionAutocomplete} t={t} />
                                        <div className="search-icon">
                                            <IconButton disabled={value === ''} edge="start" onClick={searchByClick} aria-label="close">
                                                <SearchIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="submenu-left" className="header-main">
                        <div className="header-middle">
                            <div className="header-middle__left">
                                <div className="box header-middle__logo">
                                    <Link href="/">
                                        <img
                                            className="header-middle__logo-link"
                                            src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="header-middle__right-condensed">
                                <div className="box">
                                    <div className="header-middle__icons">
                                        <ul className="special-ul">
                                            {enablePopupInstallation ? (
                                                <DesktopInstallAppV2 appName={appName} installMessage={installMessage} />
                                            ) : null}
                                            <li>
                                                {!isLogin ? (
                                                    t('common:header:welcome')
                                                ) : (
                                                    <>
                                                        <Link href="/customer/account">
                                                            <a>
                                                                {data.customer
                                                                    ? `${t('common:header:hi').replace(
                                                                          '$',
                                                                          // eslint-disable-next-line comma-dangle
                                                                          `${data.customer.firstname} ${data.customer.lastname}`
                                                                      )}`
                                                                    : null}
                                                            </a>
                                                        </Link>
                                                        <ul>
                                                            <li>
                                                                <Link href="/customer/account">
                                                                    <a>{t('common:menu:myaccount')}</a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/wishlist">
                                                                    <a>
                                                                        {t('common:menu:mywishlist')} (
                                                                        {data.wishlist ? data.wishlist.items.length : 0} items ){' '}
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <a href="#" onClick={handleLogout}>
                                                                    {t('common:menu:signout')}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </>
                                                )}
                                            </li>
                                            {modules.trackingorder.enabled ? (
                                                <li>
                                                    <Link href="/sales/order/track">
                                                        <a>{t('common:menu:trackingorder')}</a>
                                                    </Link>
                                                </li>
                                            ) : null}
                                            <li>
                                                <SwitcherLanguage {...props} />
                                            </li>
                                            <li>
                                                <SwitcherCurrency {...props} />
                                            </li>
                                        </ul>
                                        <div className="signin">
                                            <Link href="/customer/account" passHref>
                                                <Badge color="secondary">
                                                    <PersonIcon color="secondary" />
                                                </Badge>
                                            </Link>
                                        </div>
                                        <div className="notification">
                                            <NotificationBell withLink />
                                        </div>
                                        {modules.productcompare.enabled && (
                                            <div className="shopping-bag">
                                                <ProductCompareIcon withLink isLogin={isLogin} />
                                            </div>
                                        )}
                                        <div id="header-shoppingBag-icon" className="shopping-bag">
                                            <ShoppingBagIcon withLink storeConfig={storeConfig} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-middle second-level-header">
                            <div className="header-middle__center">
                                <div className="row menu-category">
                                    <div className="col-xs-12 menu-middle">
                                        {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                                    </div>
                                </div>
                                <div className="header-small__menu">
                                    {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                                </div>
                            </div>
                            <div>
                                <div className="box">
                                    <div className="header-middle__search">
                                        <Autocomplete setValue={setValue} handleSearch={handleSearch} OptionsItem={OptionAutocomplete} t={t} />
                                        <div className="search-icon">
                                            <IconButton disabled={value === ''} edge="start" onClick={searchByClick} aria-label="close">
                                                <SearchIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <style jsx>
                    {`
                        .signin {
                            cursor: pointer;
                        }
                        .header-middle__icons > .signin {
                            margin-left: 10px !important;
                        }
                        ul {
                            margin: 0;
                            list-style: none;
                            padding: 0;
                            float: right;
                            font-size: 10px;
                            text-transform: uppercase;
                            font-family: Montserrat !important;
                        }

                        .special-ul {
                            float: left !important;
                        }

                        li {
                            display: inline-block;
                            padding: 5px 10px;
                            position: relative;
                        }
                        li:hover > ul {
                            display: block;
                        }
                        ul ul {
                            position: absolute;
                            display: none;
                            margin: 0;
                            padding: 5px 10px;
                            z-index: 999;
                            background: #fff;
                            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
                        }
                        ul ul li {
                            display: block;
                        }

                        ul ul ul {
                            position: absolute;
                            top: 0;
                            left: 100%;
                        }
                        a {
                            color: #000;
                            text-decoration: none;
                        }

                        a:hover {
                            border-bottom: 1px dashed #fff;
                            color: #b9acac;
                        }
                        .header-main {
                            max-width: 1440px;
                            // background: url('./assets/img/screenshots/header.webp') no-repeat center center;
                            width: 97%;
                            margin: 0 auto;
                        }
                        @media (min-width: 768px) {
                            ul {
                                // padding-top: 2vh;
                            }
                            #header {
                                ${storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header
                                    ? 'position: fixed;'
                                    : 'position: relative; z-index: 1100;'}
                                width: 100%;
                                background-color: transparent;
                                z-index: 3;
                                top: ${showGlobalPromo ? '45px' : '0'};
                                transition: top 1s ease;
                            }
                            .header-bgcolor {
                                background-color: white !important;
                                transition: background-color 1s ease;
                            }
                            .header-middle__center {
                                display: none;
                            }
                            .hidden-submenu {
                                display: none !important;
                                opacity: 0;
                                transition: opacity 5s ease;
                            }
                        }

                        main {
                            background-color: transparent !important;
                        }
                        .header-top {
                            height: 45px;
                            border-bottom: 1px solid #d6d6d6;
                            display: flex;
                            align-items: center;
                            padding: 10px 0;
                            margin: 0;
                        }

                        @media only screen and (max-width: 1023px) and (min-width: 768px) {
                            .header-top {
                                height: unset;
                                padding-top: 0;
                            }
                        }

                        @media only screen and (min-width: 1024px) and (max-width: 1200px) {
                            .header-middle.second-level-header {
                                padding-top: 10px;
                                display: grid !important;
                                grid-template-columns: 2fr 1fr;
                            }

                            .header-middle__center {
                                display: block !important;
                                margin-top: 1rem;
                            }

                            .header-middle__right {
                                width: 300px !important;
                            }
                        }

                        .header-middle-second-level-header {
                            padding-bottom: 1rem;
                            padding-top: 0px;
                            // display: grid;
                            // align-items: center;
                            // justify-content: space-between;
                        }

                        .second-level-header {
                            padding-bottom: 1rem;
                            padding-top: 0px;
                            // display: grid;
                        }

                        .header-middle {
                            padding-top: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                        .header-middle__left {
                            width: 120px;
                        }
                        .header-middle__right {
                            width: 600px;
                        }
                        .header-middle__right-condensed {
                            width: 1024px;
                        }
                        .header-small__menu {
                            display: none;
                        }
                        .header-middle img {
                            width: 120px;
                        }
                        .header-middle__logo-link {
                            cursor: pointer;
                        }
                        .header-middle__icons {
                            float: right;
                            padding-left: 4px;
                            padding-right: 16px;
                        }
                        .header-middle__icons > div {
                            margin-right: -5px;
                            margin-left: 0px;
                            display: inline-block;
                        }
                        .search-icon {
                            position: absolute;
                            right: -10px;
                            top: 7px;
                            background: transparent;
                            z-index: 9;
                        }
                        .header-middle__search {
                            display: flex;
                            align-items: center;
                            float: right;
                            position: relative;
                        }

                        .header-middle__search .margin-top-1rem {
                            margin-top: -1rem !important;
                        }
                        .menu-category {
                            width: fit-content;
                            display: block;
                        }
                        .global-promo {
                            height: 45px;
                            border-bottom: 1px solid #d6d6d6;
                            display: flex;
                            align-items: center;
                            padding: 10px 0;
                            margin: 0;
                            background-color: red;
                        }
                    `}
                </style>
                <style global jsx>
                    {`
                        .header-middle__search .MuiAutocomplete-popupIndicator {
                            display: none !important;
                        }

                        .header-middle__search .margin-top-1rem .MuiAutocomplete-root {
                            padding: 2px 5px 15px 5px !important;
                        }
                        .hidden-submenu {
                            display: none !important;
                            opacity: 0;
                            transition: opacity 5s ease;
                        }
                        .header-small {
                            // top: -45px !important;
                        }
                        @media (min-width: 1250px) {
                            .header-small .header-small__menu {
                                display: block;
                            }
                            .header-middle__center {
                                display: block !important;
                            }
                            .header-tab {
                                display: none;
                            }
                            .header-small .menu-category {
                                display: none;
                            }
                            .header-small {
                                height: 75px !important;
                            }
                            .hidden-submenu {
                                display: none !important;
                                transition: display 1s ease;
                            }
                        }
                    `}
                </style>
            </div>
        </>
    );
};

export default ViewTopNavigation;
