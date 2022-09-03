/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { checkoutAgreements } from '@core_modules/checkout/services/graphql';

const Confirmation = (props) => {
    const {
        t, checkout, setCheckout, ConfirmationView,
    } = props;

    const { loading, data: agreements } = checkoutAgreements();
    const [modalList, setModalList] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [isAgree, setIsAgree] = useState(false);

    const checkAgree = (checkboxItem) => {
        for (let i = 0; i < checkboxItem.length; i += 1) {
            if ((checkboxItem[i].mode === 'MANUAL' && checkboxItem[i].isChecked) || checkboxItem[i].mode === 'AUTO') {
                setIsAgree(true);
            } else if (checkboxItem[i].mode === 'MANUAL' && !checkboxItem[i].isChecked) {
                setIsAgree(false);
                break;
            }
        }
    };

    const handleCheckbox = (index) => {
        const checkboxItem = [...checkList];
        checkboxItem[index].isChecked = !checkboxItem[index].isChecked;
        setCheckList(checkboxItem);
        checkAgree(checkboxItem);
    };

    const handleOpenModal = (index) => {
        const modalItem = [...modalList];
        modalItem[index].isOpen = true;
        setModalList(modalItem);
    };

    const handleCloseModal = (index) => {
        const modalItem = [...modalList];
        modalItem[index].isOpen = false;
        setModalList(modalItem);
    };

    useEffect(() => {
        if (agreements && checkList.length === 0) {
            let checkboxItem = [];
            let modalItem = [];
            for (let i = 0; i < agreements.checkoutAgreements.length; i += 1) {
                checkboxItem = [...checkboxItem, {
                    id: i,
                    name: agreements.checkoutAgreements[i].name,
                    mode: agreements.checkoutAgreements[i].mode,
                    isChecked: agreements.checkoutAgreements[i].mode === 'AUTO',
                }];
                modalItem = [...modalItem, { id: i, isOpen: false }];
            }
            setCheckList(checkboxItem);
            setModalList(modalItem);
            checkAgree(checkboxItem);
        } else if (!agreements && checkList.length === 0) {
            // If there's no terms & condition list in GraphQL responses, checkout confirmation should be true
            setIsAgree(true);
        }
        checkout.confirmation = isAgree;
        setCheckout(checkout);
    }, [agreements, isAgree]);

    return (
        <ConfirmationView
            t={t}
            loading={loading}
            agreements={agreements}
            checkList={checkList}
            modalList={modalList}
            handleCheckbox={handleCheckbox}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
        />
    );
};

export default Confirmation;
