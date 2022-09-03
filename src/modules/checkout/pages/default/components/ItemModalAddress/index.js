import React from 'react';
import Component from '@core_modules/checkout/pages/default/components/ItemModalAddress/view';
import { updateCustomerAddress } from '@core_modules/checkout/services/graphql';

const ItemAddressCore = (props) => {
    const { manageCustomer, handleChange, handleCloseDiff } = props;
    const [updateAddress] = updateCustomerAddress();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const handleSave = async (data) => {
        setLoading(true);
        updateAddress({
            variables: {
                ...data,
            },
        })
            .then(async () => {
                if (data.defaultShippingBilling || data.addressId === props.selectedAddressId) {
                    await handleChange(
                        {
                            target: {
                                value: data.addressId,
                                valueAddress: data.addressDetail,
                            },
                        },
                        data.addressId === props.selectedAddressId,
                    );
                } else if (data.addressId !== props.selectedAddressId) {
                    await handleCloseDiff();
                }
                setSuccess(true);
                setLoading(false);
                setTimeout(() => {
                    setOpen(false);
                    setSuccess(false);
                    manageCustomer.refetch();
                }, 1500);
            })
            .catch(() => {
                setSuccess(false);
                setLoading(false);
                setOpen(false);
            });
    };

    return <Component {...props} loading={loading} handleSave={handleSave} setOpen={setOpen} success={success} open={open} />;
};

export default ItemAddressCore;
