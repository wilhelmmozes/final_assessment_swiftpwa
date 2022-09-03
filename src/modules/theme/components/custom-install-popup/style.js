import { makeStyles } from '@material-ui/core/styles';
import { BLACK, PRIMARY, WHITE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    containerMobile: {
        width: '100%',
        height: '100px',
        padding: '10px',
        background: '#bc2494',
        color: '#fff',
        marginTop: '56px',
        display: 'none',
        alignItems: 'center',
        marginRight: '0px !important',
        marginLeft: '0px !important',
    },
    titleMobile: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    iconClose: {
        width: '10%',
    },
    iconCloseV2: {
        width: 'unset',
    },
    iconCloseButton: {
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: '65%',
    },
    textContainerV2: {
        width: 'unset',
    },
    btnInstallContainer: {
        width: '25%',
    },
    btnInstallContainerV2: {
        width: 'unset',
    },
    btnInstall: {
        background: WHITE,
        color: PRIMARY,
        fontSize: 11,
        '&:hover': {
            background: WHITE,
        },
    },
    popupInstallDesktop: {
        display: 'inline-block !important',
        position: 'absolute',
        top: '4px',
        fontSize: 13,
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
            background: '#bc2494',
            margin: '-5px -1.5% 10px -1.5%',
            padding: '5px',
            color: WHITE,
            '& button': {
                background: WHITE,
                color: BLACK,
            },
        },
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            top: '4px',
            left: '0',
            background: 'unset',
            padding: 'unset',
            color: BLACK,
            margin: 'unset',
            '& button': {
                background: BLACK,
                color: WHITE,
            },
        },
    },
    btnInstallDesktop: {
        fontSize: 11,
    },
}));

export default useStyles;
