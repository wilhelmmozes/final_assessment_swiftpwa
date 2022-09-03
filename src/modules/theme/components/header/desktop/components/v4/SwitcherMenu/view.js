import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';

/**
 * useStyle
 */
const useStyles = makeStyles(() => ({
    listItemText: {
        fontSize: '.6rem', // Insert your required size
        textTransform: 'uppercase',
    },
}));

const ViewSwitcherCurrency = (props) => {
    const {
        t, title, id, open, anchorEl, currencyState, handleClick, handleClose, loading,
    } = props;

    const router = useRouter();

    const classes = useStyles();
    const buttonRef = useRef();
    const anchorOrigin = { vertical: 'bottom', horizontal: 'right' };
    const transforOrigin = { vertical: 'top', horizontal: 'right' };
    const styleTitle = { fontSize: 12, textTransform: 'uppercase' };
    const styleButton = { fontFamily: 'Montserrat', padding: '0px', fontSize: title ? '12px' : '1em' };

    const isEmptyCookiesCurrency = currencyState === undefined || currencyState === null;
    /**
     * loading state
     */
    if (loading || isEmptyCookiesCurrency || currencyState === null) {
        return (
            <div>
                {title && <Skeleton style={{ padding: 0 }} variant="rect" width={100} height={10} />}
                <Skeleton style={{ display: 'inline-block', padding: 0 }} variant="rect" width={100} height={10} />
            </div>
        );
    }

    /**
     * not loading && check data
     */
    if (!loading && currencyState !== null) {
        if (currencyState.exchange_rates.length <= 1) {
            return null;
        }
    }

    /**
     * rendering
     */
    return (
        <div>
            {/* [CURRENCY] TITLE */}
            {title && (
                <div>
                    <strong style={styleTitle}>{title}</strong>
                </div>
            )}

            {/* [CURRENCY] BUTTON */}
            <Button ref={buttonRef} onClick={handleClick} style={styleButton}>
                <strong>More...</strong>
            </Button>

            {/* [CURRENCY] LIST */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transforOrigin}
                container={buttonRef.current}
            >
                <List component="nav">
                    <ListItem
                        button
                        key="menu-1"
                        onClick={() => router.push('/confirmpayment')}
                    >
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary={t('common:menu:confirmpayment')}
                        />
                    </ListItem>
                    <ListItem
                        button
                        key="menu-2"
                        onClick={() => router.push('/sales/order/track')}
                    >
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary={t('common:menu:trackingorder')}
                        />
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
};

export default ViewSwitcherCurrency;
