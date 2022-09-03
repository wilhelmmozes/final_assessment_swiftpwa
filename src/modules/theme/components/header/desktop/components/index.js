/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import TextField from '@material-ui/core/TextField';
import NavbarV1 from '@core_modules/theme/components/header/desktop/components/v1';
import NavbarV2 from '@core_modules/theme/components/header/desktop/components/v2';
import NavbarV3 from '@core_modules/theme/components/header/desktop/components/v3';
import NavbarV4 from '@core_modules/theme/components/header/desktop/components/v4';

const ViewTopNavigation = (props) => {
    const { storeConfig } = props;

    if (storeConfig && storeConfig.pwa) {
        if (storeConfig.pwa.header_version === 'v1') {
            return <NavbarV1 {...props} />;
        }
        if (storeConfig.pwa.header_version === 'v2') {
            return <NavbarV2 {...props} />;
        }
        if (storeConfig.pwa.header_version === 'v3') {
            return <NavbarV3 {...props} />;
        }
        if (storeConfig.pwa.header_version === 'v4') {
            return <NavbarV4 {...props} />;
        }
    }
};

export default ViewTopNavigation;
