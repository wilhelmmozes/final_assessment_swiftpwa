import React from 'react';
import TagManager from 'react-gtm-module';
import gqlService from '@core_modules/checkout/services/graphql';

const Shipping = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        updateFormik,
        handleOpenMessage,
        storeConfig,
        isOnlyVirtualProductOnCart,
        ShippingView,
        checkoutTokenState,
        setCheckoutTokenState,
    } = props;

    const { loading, data, selected } = checkout;
    const [setShippingMethod] = gqlService.setShippingMethod();
    const { data: shippingMethodList } = gqlService.getCheckoutConfigurations();

    const handleShipping = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            const [carrier_code, method_code] = val.split('_');
            let state = {
                ...checkout,
                loading: {
                    ...checkout.loading,
                    all: false,
                    shipping: false,
                    extraFee: true,
                    order: true,
                },
            };
            state.selected.shipping = val;
            setCheckout(state);

            let updatedCart = {};
            await setShippingMethod({
                variables: {
                    cartId: cart.id,
                    carrierCode: carrier_code,
                    methodCode: method_code,
                },
            }).then((res) => {
                updatedCart = res;
            }).catch((err) => {
                updatedCart = err;
            });

            state = {
                ...checkout,
                loading: {
                    ...checkout.loading,
                    all: false,
                    shipping: false,
                    payment: false,
                    extraFee: false,
                    order: false,
                },
            };
            setCheckout(state);

            if (updatedCart && updatedCart.data && updatedCart.data.setShippingMethodsOnCart && updatedCart.data.setShippingMethodsOnCart.cart) {
                updatedCart = {
                    ...checkout.data.cart,
                    ...updatedCart.data.setShippingMethodsOnCart.cart,
                };
                updateFormik(updatedCart);

                const paymentMethod = updatedCart.available_payment_methods.map((method) => ({
                    ...method,
                    label: method.title,
                    value: method.code,
                    image: null,
                }));

                state = { ...checkout };
                state.data.paymentMethod = paymentMethod;
                state.data.cart = updatedCart;
                setCheckout(state);
                const selectedShipping = data.shippingMethods.filter((item) => item.method_code === method_code);
                const dataLayer = {
                    event: 'checkout',
                    ecommerce: {
                        checkout: {
                            actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout' },
                            products: cart.items.map(({ quantity, product, prices }) => ({
                                name: product.name,
                                id: product.sku,
                                price: JSON.stringify(prices.price.value),
                                category: product.categories.length > 0 ? product.categories[0].name : '',
                                list: product.categories.length > 0 ? product.categories[0].name : '',
                                quantity: JSON.stringify(quantity),
                                dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                                dimension5: '',
                                dimension6: '',
                                dimension7: prices.discount ? 'YES' : 'NO',
                            })),
                        },
                        currencyCode: storeConfig.base_currency_code || 'IDR',
                    },
                };
                const dataLayerOption = {
                    event: 'checkoutOption',
                    ecommerce: {
                        currencyCode: storeConfig.base_currency_code || 'IDR',
                        checkout_option: {
                            actionField: { step: 2, option: selectedShipping[0].label, action: 'checkout_option' },
                        },
                    },
                };
                TagManager.dataLayer({
                    dataLayer,
                });
                TagManager.dataLayer({
                    dataLayer: dataLayerOption,
                });
            } else {
                state.selected.shipping = null;
                if (updatedCart.message.includes('Token is wrong.')) {
                    setCheckoutTokenState(!checkoutTokenState);
                } else {
                    handleOpenMessage({
                        variant: 'error',
                        text: t('checkout:message:problemConnection'),
                    });
                }
            }
        }
    };

    return (
        <ShippingView
            checkout={checkout}
            storeConfig={storeConfig}
            t={t}
            shippingMethodList={shippingMethodList}
            handleShipping={handleShipping}
            loading={loading}
            selected={selected}
            data={data}
            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
        />
    );
};

export default Shipping;
