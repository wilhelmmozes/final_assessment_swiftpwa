/* eslint-disable prefer-destructuring */
/* eslint-disable comma-dangle */

import { modules } from '@config';
import gqlService from '@core_modules/checkout/services/graphql';
import { getHost, getStoreHost } from '@helper_config';
import { getAppEnv } from '@root/core/helpers/env';
import { useState } from 'react';

const useTravelokaPay = (data = {}) => {
    // prettier-ignore
    const {
        t, travelokaPayRef, config, handleOpenMessage, checkout, setCheckout,
        payment_travelokapay_user_id,
        // payment_travelokapay_bin_whitelist,
    } = data;
    const originName = modules.checkout.checkoutOnly ? 'pwa-checkout' : 'pwa';
    const [open, setOpen] = useState(false);
    const [cardToken, setCardToken] = useState('');
    const [orderId, setorderId] = useState('');
    const state = { ...checkout };
    const [createCharge] = gqlService.travelokaCreateCharge();

    const generatesuccessRedirect = (orderNumber = '') => {
        if (config && config.successRedirect && config.successRedirect.link) {
            return `${config.successRedirect.link}${config.successRedirect.orderId ? `?orderId=${orderNumber}` : ''}`;
        }
        return '/checkout/onepage/success';
    };

    const generateCartRedirect = (orderNumber = '') => {
        if (config && config.cartRedirect && config.cartRedirect.link) {
            if (orderNumber && orderNumber !== '') {
                if (originName === 'pwa-checkout') {
                    return `${getStoreHost(getAppEnv())}snap/payment/fail?order_id=${orderNumber}`;
                }
                return `${getHost()}/checkout/cart?paymentFailed=true&orderId=${orderNumber}`;
            }
            return config.cartRedirect.link;
        }
        return '/checkout/cart';
    };

    const handleClose = () => {
        setOpen(false);
        if (cardToken === 'IN_REVIEW' && orderId) {
            window.location.replace(generateCartRedirect(orderId));
        }
    };

    const handleTravelokaPay = (orderNumber = '') => {
        const { cardNumber, cvv, expiryDate } = travelokaPayRef.current.values;
        setorderId(orderNumber);
        const expiryDatas = expiryDate.split('/');
        state.loading.order = true;

        const xenditResponseHandler = (err, creditCardCharge) => {
            if (err) {
                // Show the errors on the form
                handleOpenMessage({
                    variant: 'error',
                    text: err.message || '',
                });
                return;
            }

            if (creditCardCharge.status === 'VERIFIED') {
                const token = creditCardCharge.id;
                setCardToken(token);

                createCharge({
                    variables: {
                        token_id: token,
                        amount: checkout.data.cart.prices.grand_total.value.toString(),
                        card_cvn: cvv,
                        order_id: orderNumber,
                    },
                })
                    .then((res) => {
                        handleClose();
                        if (res.data?.travelokaCharge?.status === 'CAPTURED') {
                            handleOpenMessage({
                                variant: 'success',
                                text: t('checkout:message:placeOrder'),
                            });
                            window.location.replace(generatesuccessRedirect(orderNumber));
                        } else if (res.errors) {
                            handleOpenMessage({
                                variant: 'error',
                                text: t('checkout:message:serverError'),
                            });
                            window.location.replace(generateCartRedirect(orderNumber));
                        }
                    })
                    .catch((error) => {
                        handleOpenMessage({
                            variant: 'error',
                            text: error || t('checkout:message:serverError'),
                        });
                        window.location.replace(generateCartRedirect(orderNumber));
                    });
            } else if (creditCardCharge.status === 'IN_REVIEW') {
                const status = creditCardCharge.status;
                setCardToken(status);
                setOpen(true);

                window.open(creditCardCharge.payer_authentication_url, 'sample-inline-frame');
            } else if (creditCardCharge.status === 'FAILED') {
                setCardToken(creditCardCharge.failure_reason);
                state.loading.order = false;
                setCheckout(state);

                const msg = t('checkout:message:serverError');
                handleOpenMessage({
                    variant: 'error',
                    text: msg,
                });
                window.location.replace(generateCartRedirect(orderNumber));
            }
        };

        window.Xendit.card.createToken(
            {
                amount: checkout.data.cart.prices.grand_total.value, // 100000
                card_number: cardNumber, // 4000000000000002
                card_exp_month: expiryDatas[0], // 12
                card_exp_year: `20${expiryDatas[1]}`, // 2025
                card_cvn: cvv, // 123
                is_multiple_use: false,
                on_behalf_of: payment_travelokapay_user_id || '',
            },
            // {
            //     amount: '100000',
            //     card_number: '4000000000000002',
            //     card_exp_month: '12',
            //     card_exp_year: '2025',
            //     card_cvn: '123',
            //     is_multiple_use: false,
            // },
            xenditResponseHandler
        );
    };

    return {
        open,
        setOpen,
        handleClose,
        handleTravelokaPay,
        cardToken,
        setCardToken,
    };
};

export default useTravelokaPay;
