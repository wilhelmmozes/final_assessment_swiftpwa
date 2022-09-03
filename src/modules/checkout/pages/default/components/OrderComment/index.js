const OrderComment = (props) => {
    const {
        formik,
        OrderCommentView,
    } = props;

    return (
        <OrderCommentView formik={formik} />
    );
};

export default OrderComment;
