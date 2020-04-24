import {
    AppBar, Dialog, IconButton, Slide,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React from 'react';
import RadioGroup from '@components/Forms/Radio';
import Typography from '@components/Typography';
import RangeSlider from '@components/Forms/RangeSlider';
import CheckBox from '@components/Forms/CheckBox';
import CheckBoxSize from '@components/Forms/CheckBoxSize';
import CheckBoxColor from '@components/Forms/CheckBoxColor';
import Button from '@components/Button';
import Loading from '@components/Loaders';
import { elastic } from '@config';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const FilterDialog = ({
    open,
    setOpen,
    itemProps = {},
    data = {},
    loading = false,
    sortByData = [],
    getValue = () => {},
    defaultValue = {},
}) => {
    const styles = useStyles();
    const [selectedFilter, setFilter] = React.useState(defaultValue);
    const [sort, setSort] = React.useState(defaultValue.sort ? defaultValue.sort : '');
    const [priceRange, setPriceRange] = React.useState(defaultValue.priceRange ? defaultValue.priceRange.split(',') : [0, 0]);
    const handleClear = () => {
        setSort('');
        setPriceRange([0, 0]);
    };

    const handleSave = () => {
        if (selectedFilter.priceRange) {
            delete selectedFilter.priceRange;
        }

        if (selectedFilter.sort) {
            delete selectedFilter.sort;
        }
        const savedData = {
            selectedFilter,
        };
        if (sort !== '') {
            savedData.sort = sort;
        }
        if (priceRange[1] !== 0) {
            savedData.priceRange = priceRange;
        }
        getValue(savedData);
        setOpen();
    };
    let filter = [];
    if (data.getFilterAttributeOptions) {
        filter = data.getFilterAttributeOptions.data;
    }

    const setCheckedFilter = (name, value) => {
        let selected = '';
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < value.length; index++) {
            selected += `${index !== 0 ? ',' : ''}${value[index]}`;
        }
        selectedFilter[name] = selected;
        setFilter({ ...selectedFilter });
    };

    const setSelectedFilter = (code, value) => {
        selectedFilter[code] = value;
        setFilter({ ...selectedFilter });
    };
    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
        >
            <AppBar className={styles.appBar}>
                <IconButton
                    className={styles.btnClose}
                    edge="start"
                    onClick={setOpen}
                    aria-label="close"
                >
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography
                    variant="span"
                    type="bold"
                    align="center"
                    letter="uppercase"
                    className={styles.title}
                >
                    Filter & Sort
                    {' '}
                </Typography>
            </AppBar>
            <div className={styles.body}>
                {itemProps && itemProps.sortBy === false ? null : (
                    <div className={styles.fieldContainer}>
                        <RadioGroup
                            label={itemProps.labelSortBy || 'Sort By'}
                            valueData={sortByData || []}
                            value={itemProps.sortByValue || sort}
                            onChange={itemProps.sortByChange || setSort}
                        />
                    </div>
                )}
                {loading ? <Loading size="20px" /> : null}
                {filter.map((itemFilter, idx) => {
                    if (itemFilter.field === 'price') {
                        return (
                            <div className={styles.fieldContainer} key={idx}>
                                <RangeSlider
                                    label={itemFilter.label}
                                    maxValue={itemFilter.maxprice}
                                    value={priceRange}
                                    onChange={
                                        itemProps.priceRangeChange
                                        || setPriceRange
                                    }
                                />
                            </div>
                        );
                    } if (itemFilter.field === 'size') {
                        return (
                            <div className={styles.fieldContainer} key={idx}>
                                <CheckBox
                                    name={itemFilter.field}
                                    label={itemFilter.label || 'Size'}
                                    data={itemFilter.value}
                                    value={defaultValue[itemFilter.field] ? defaultValue[itemFilter.field].split(',') : []}
                                    flex={itemProps.selectSizeFlex || 'row'}
                                    CustomItem={itemProps.selectSizeItem || CheckBoxSize}
                                    onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                />
                            </div>
                        );
                    } if (itemFilter.field === 'color') {
                        return (
                            <div className={styles.fieldContainer} key={idx}>
                                <CheckBox
                                    name={itemFilter.field}
                                    label={itemFilter.label || 'COlor'}
                                    data={itemFilter.value}
                                    value={defaultValue[itemFilter.field] ? defaultValue[itemFilter.field].split(',') : []}
                                    flex={itemProps.selectSizeFlex || 'row'}
                                    CustomItem={itemProps.selectColorItem || CheckBoxColor}
                                    onChange={(val) => setCheckedFilter(itemFilter.field, val)}
                                />
                            </div>
                        );
                    }
                    return (
                        <div className={styles.fieldContainer} key={idx}>
                            {elastic ? (
                                <CheckBox
                                    field={itemFilter.field}
                                    label={itemFilter.label || ''}
                                    data={itemFilter.value || []}
                                    value={itemProps.filterValue ? itemProps.filterValue[itemFilter.field] : []}
                                    flex="column"
                                    onChange={() => {}}
                                />
                            )
                                : (
                                    <RadioGroup
                                        name={itemFilter.field}
                                        label={itemFilter.label || ''}
                                        valueData={itemFilter.value || []}
                                        value={selectedFilter[itemFilter.field]}
                                        onChange={(value) => setSelectedFilter(itemFilter.field, value)}
                                    />
                                )}
                        </div>
                    );
                })}
            </div>

            <div className={styles.footer}>
                <Button
                    variant="outlined"
                    className={styles.btnSave}
                    onClick={handleClear}
                >
                    Clear
                </Button>
                <Button className={styles.btnSave} onClick={handleSave}>
                    Save
                </Button>
            </div>
        </Dialog>
    );
};

export default FilterDialog;
