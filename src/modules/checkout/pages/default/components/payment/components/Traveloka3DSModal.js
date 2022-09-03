/* eslint-disable jsx-a11y/iframe-has-title */
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Traveloka3DSModal = (props) => {
    const { open, handleClose } = props;
    const classes = useStyles();

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="three-ds-modal">
                <div className={classes.paper}>
                    <iframe height={450} width={550} id="sample-inline-frame" name="sample-inline-frame" />
                </div>
            </Modal>
            <style jsx>
                {`
                    .travelokapay-form :global(.textfield) {
                        margin-right: 10px;
                    }
                `}
            </style>
        </>
    );
};

export default Traveloka3DSModal;
