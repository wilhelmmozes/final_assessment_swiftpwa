import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/cart/pages/default/components/style';

const SkeletonCart = () => {
    const styles = useStyles();
    return (
        <>
            <div className="hidden-desktop">
                <div className={styles.container}>
                    <Skeleton variant="rect" width="100%" height={40} style={{ marginBottom: 20 }} />
                    {
                        [1, 2, 3, 4].map((i) => (
                            <div className="row" key={i} style={{ marginBottom: 15 }}>
                                <div className="col-xs-4">
                                    <Skeleton variant="rect" width="100%" height={150} />
                                </div>
                                <div className="col-xs-8">
                                    <Skeleton variant="text" width="100%" height={30} />
                                    <Skeleton variant="text" width="100%" height={30} />
                                    <Skeleton variant="text" width="100%" height={30} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="hidden-mobile">
                <div className="row">
                    <div className="col-xs-12 col-sm-8 col-md-9" style={{ height: '100%' }}>
                        <Skeleton variant="rect" width="100%" height={40} style={{ marginBottom: 20 }} />
                        {
                            [1, 2, 3, 4, 5].map((i) => (
                                <div className="row" key={i} style={{ marginBottom: 15 }}>
                                    <div className="col-xs-2">
                                        <Skeleton variant="rect" width="80%" height={150} />
                                    </div>
                                    <div className="col-xs-10">
                                        <Skeleton variant="text" width="100%" height={30} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-3 hidden-mobile">
                        <Skeleton variant="rect" width="100%" height={200} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkeletonCart;
