/* eslint-disable radix */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/iframe-has-title */
import TextField from '@common_textfield';
import Typography from '@common_typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from '@i18n';

const TravelokaPayForm = (props) => {
    const { travelokaPayRef, payment_travelokapay_bin_whitelist } = props;
    const { t } = useTranslation(['checkout']);

    const cardNumberPattern = new RegExp(payment_travelokapay_bin_whitelist ? `^${payment_travelokapay_bin_whitelist}[0-9]+$` : /^[0-9]+$/);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .nullable()
            .required(`${t('checkout:travelokaPay:validation:nameOnCard')} ${t('checkout:travelokaPay:validation:required')}`),
        cardNumber: Yup.string()
            .nullable()
            .required(`${t('checkout:travelokaPay:validation:cardNumber')} ${t('checkout:travelokaPay:validation:required')}`)
            .matches(cardNumberPattern, `${t('checkout:travelokaPay:validation:cardNumber')} ${t('checkout:travelokaPay:validation:invalid')}`) // digit only
            .min(16, `${t('checkout:travelokaPay:validation:cardNumber')} ${t('checkout:travelokaPay:validation:invalid')}`)
            .max(16, `${t('checkout:travelokaPay:validation:cardNumber')} ${t('checkout:travelokaPay:validation:invalid')}`),
        expiryDate: Yup.string()
            .nullable()
            .required(`${t('checkout:travelokaPay:validation:expiryDate')} ${t('checkout:travelokaPay:validation:required')}`)
            .matches(/(\d{2}\/\d{2})/, `${t('checkout:travelokaPay:validation:expiryDate')} ${t('checkout:travelokaPay:validation:invalid')}`),
        cvv: Yup.string()
            .nullable()
            .required(`${t('checkout:travelokaPay:validation:cvv')} ${t('checkout:travelokaPay:validation:required')}`),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
        validationSchema,
        onSubmit: () => {
            travelokaPayRef.current = formik;
        },
    });

    if (!travelokaPayRef.current) {
        travelokaPayRef.current = formik;
    }

    const handleChangeInput = (field, value) => {
        travelokaPayRef.current.values[field] = value;
        formik.setFieldValue(field, value);
    };

    return (
        <>
            <div className="travelokapay-form" style={{ marginLeft: '2rem' }}>
                <div>
                    <Typography>{t('checkout:travelokaPay:switchPayment')}</Typography>
                    <Typography variant="h4">
                        <a
                            href="https://www.traveloka.com/id-id/travelokapay/paylater"
                            target="_blank"
                            rel="noreferrer"
                            className="travelokapay-apply-link"
                        >
                            {t('checkout:travelokaPay:activateTravelokaPaylater')}
                        </a>
                    </Typography>
                </div>
                <br />
                <Typography> {t('checkout:travelokaPay:enterPaymentDetails')}</Typography>
                <form className="travelokapay-form-content">
                    <div style={{ display: 'flex' }}>
                        <TextField
                            className="travelokapay-form-input"
                            name="name"
                            placeholder={t('checkout:travelokaPay:validation:nameOnCard')}
                            fullWidth={false}
                            value={formik.values.name}
                            onChange={(e) => handleChangeInput('name', e.target.value)}
                            error={!!(formik.touched.name && formik.errors.name)}
                            errorMessage={(formik.touched.name && formik.errors.name) || null}
                        />
                        <TextField
                            className="travelokapay-form-input"
                            type="number"
                            name="cardNumber"
                            placeholder={t('checkout:travelokaPay:validation:cardNumber')}
                            value={formik.values.cardNumber}
                            onChange={(e) => handleChangeInput('cardNumber', e.target.value)}
                            error={!!(formik.touched.cardNumber && formik.errors.cardNumber)}
                            errorMessage={(formik.touched.cardNumber && formik.errors.cardNumber) || null}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16);
                            }}
                            onWheel={(e) => e.target.blur()}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            className="travelokapay-form-input"
                            name="expiryDate"
                            placeholder={t('checkout:travelokaPay:validation:expiryDate')}
                            value={formik.values.expiryDate}
                            onChange={(e) => {
                                let { value } = e.target;

                                if (value.length > 5) {
                                    return;
                                }
                                if (value.length === 2 && formik.values.expiryDate.length === 1) {
                                    value += '/';
                                } else if (value.length === 2 && formik.values.expiryDate.length === 3) {
                                    value = value.substring(0, value.length - 1);
                                }
                                handleChangeInput('expiryDate', value);
                            }}
                            error={!!(formik.touched.expiryDate && formik.errors.expiryDate)}
                            errorMessage={(formik.touched.expiryDate && formik.errors.expiryDate) || null}
                        />
                        <TextField
                            className="travelokapay-form-input"
                            type="number"
                            name="cvv"
                            placeholder={t('checkout:travelokaPay:validation:cvv')}
                            value={formik.values.cvv}
                            onChange={(e) => handleChangeInput('cvv', e.target.value)}
                            error={!!(formik.touched.cvv && formik.errors.cvv)}
                            errorMessage={(formik.touched.cvv && formik.errors.cvv) || null}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3);
                            }}
                            onWheel={(e) => e.target.blur()}
                        />
                    </div>
                </form>
            </div>
            <style jsx>
                {`
                    .travelokapay-apply-link {
                        color: #0000cd;
                    }
                    .travelokapay-form-content :global(input[type='number']::-webkit-outer-spin-button),
                    .travelokapay-form-content :global(input[type='number']::-webkit-inner-spin-button) {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    .travelokapay-form-content :global(input[type='number']) {
                        -moz-appearance: textfield;
                    }
                    .travelokapay-form-content :global(.travelokapay-form-input) {
                        margin-left: 10px;
                        margin-right: 10px;
                    }
                `}
            </style>
        </>
    );
};

export default TravelokaPayForm;
