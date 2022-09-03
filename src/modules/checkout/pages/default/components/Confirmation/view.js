/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-danger */
import React from 'react';
import Typography from '@common_typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from '@core_modules/checkout/pages/default/components/Confirmation/style';

const ConfirmationView = ({
    t, loading, agreements, checkList, modalList, handleCheckbox, handleOpenModal, handleCloseModal,
}) => {
    const styles = useStyles();

    const Loader = () => (
        <div className={styles.container}>
            <Skeleton variant="text" width="40%" height={35} />
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="80%" height={30} />
        </div>
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className={styles.container} id="checkoutAgreements">
                {
                    agreements && agreements.checkoutAgreements.map((item, index) => (
                        <Grid id="agreement-row" container spacing={0} key={index}>
                            <Grid item md={12} xs={12}>
                                {
                                    item.mode === 'MANUAL' ? (
                                        <Checkbox
                                            checked={(checkList.length === 0) ? false : checkList[index].isChecked}
                                            onChange={() => handleCheckbox(index)}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                            color="primary"
                                            size="small"
                                        />
                                    )
                                        : (
                                            <Checkbox
                                                disabled
                                                checked
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                color="primary"
                                                size="small"
                                            />
                                        )
                                }
                                <Button onClick={() => handleOpenModal(index)}>
                                    <Typography
                                        variant="span"
                                        type="regular"
                                        decoration="underline"
                                        size="12"
                                    >
                                        {item.checkbox_text}
                                    </Typography>
                                </Button>
                                <Dialog
                                    onClose={() => handleCloseModal(index)}
                                    aria-labelledby="customized-dialog-title"
                                    open={modalList.length && modalList[index].isOpen}
                                >
                                    <DialogTitle>{item.name}</DialogTitle>
                                    <DialogContent dividers>
                                        <DialogContentText>
                                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleCloseModal(index)}
                                            color="primary"
                                        >
                                            {t('checkout:close')}
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </Grid>
                    ))
                }
            </div>
        </>
    );
};

export default ConfirmationView;
