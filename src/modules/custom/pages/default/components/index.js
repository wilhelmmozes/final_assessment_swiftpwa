import React from 'react';
import Images from '@core_modules/commons/Image/index';
import GridList from '@common_gridlist';

const Item = (props) => {
    const name = props.name;
    const img = props.small_image.url
    console.log(name, img);
    // console.log('ini props', props);
    return (
        <div>
            <h1>{name}</h1>
            <div className="row product-wrapper">
                <Images src={img}/>
            </div>
        </div>
    );
}

const Product = (props) => {
    const {products, t} = props;
    const {items} = products.products

    return (
        <GridList
            data={items}
            ItemComponent={Item}
            gridItemProps={{ xs: 6, sm: 4, md: 3 }}
        />
    );
}

export default Product;