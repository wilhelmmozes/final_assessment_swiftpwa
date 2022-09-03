/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import Typography from '@common_typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';

import useStyles from './style';

const CategoryList = (props) => {
    const { data } = props;

    const styles = useStyles();
    const router = useRouter();

    const [categoryKeyState, setCategoryKeyState] = useState(null);
    const [categoryDataState, setcategoryDataState] = useState(null);

    useEffect(() => {
        let categoryKey;
        let categoryData;

        if (data && data.categoryList[0] && categoryKeyState === null && categoryDataState === null) {
            categoryData = data.categoryList[0].children.map((el) => el);
            setcategoryDataState(categoryData);

            if (categoryData) {
                categoryData.map((lvl0) => {
                    categoryKey = { ...categoryKey, [`${lvl0.id}-${lvl0.url_key}`]: false };

                    if (lvl0.children.length > 0) {
                        categoryKey = { ...categoryKey, [`${lvl0.id}-${lvl0.url_key}`]: false };
                        // eslint-disable-next-line array-callback-return
                        lvl0.children.map((lvl1) => {
                            categoryKey = { ...categoryKey, [`${lvl1.id}-${lvl1.url_key}`]: false };

                            if (lvl1.children.length > 0) {
                                // eslint-disable-next-line array-callback-return
                                lvl1.children.map((lvl2) => {
                                    categoryKey = { ...categoryKey, [`${lvl2.id}-${lvl2.url_key}`]: false };
                                });
                            }
                        });
                    }
                });
            }

            setCategoryKeyState(categoryKey);
        }
    }, [data, categoryDataState, categoryKeyState]);

    const handleClick0 = (key) => {
        setCategoryKeyState({ ...categoryKeyState, [key]: !categoryKeyState[key] });
    };

    return (
        <>
            {categoryDataState &&
                categoryKeyState &&
                categoryDataState.map((lvl0) => (
                    <>
                        <ListItem button onClick={() => handleClick0(`${lvl0.id}-${lvl0.url_key}`)} className={styles.zeroLevel}>
                            <ListItemText
                                primary={
                                    <Typography variant="label" size="14" letter="uppercase" type="bold">
                                        {`${lvl0.name}`}
                                    </Typography>
                                }
                            />
                            {lvl0.children.length > 0 && (categoryKeyState[`${lvl0.id}-${lvl0.url_key}`] ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        <Collapse in={categoryKeyState[`${lvl0.id}-${lvl0.url_key}`]} timeout="auto">
                            <List component="div" disablePadding>
                                <ListItem button onClick={() => router.push(`${lvl0.url_path}`)} className={styles.firstLevel}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="label" size="14" letter="uppercase" type="bold">
                                                {`All ${lvl0.name}`}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                {lvl0.children.length > 0 &&
                                    lvl0.children.map((lvl1) => (
                                        <>
                                            {lvl1.children.length > 0 ? (
                                                <>
                                                    <ListItem
                                                        button
                                                        onClick={() => handleClick0(`${lvl1.id}-${lvl1.url_key}`)}
                                                        className={styles.firstLevel}
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="label" size="14" letter="uppercase" type="bold">
                                                                    {`${lvl1.name}`}
                                                                </Typography>
                                                            }
                                                        />
                                                        {categoryKeyState[`${lvl1.id}-${lvl1.url_key}`] ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItem>
                                                    <Collapse in={categoryKeyState[`${lvl1.id}-${lvl1.url_key}`]} timeout="auto">
                                                        <List component="div" disablePadding>
                                                            <ListItem
                                                                button
                                                                onClick={() => router.push(`${lvl1.url_path}`)}
                                                                className={styles.secondLevel}
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        <Typography variant="label" size="14" letter="uppercase" type="bold">
                                                                            {`All ${lvl1.name}`}
                                                                        </Typography>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            {lvl1.children.length > 0 &&
                                                                lvl1.children.map((lvl2) => (
                                                                    <>
                                                                        <ListItem
                                                                            button
                                                                            onClick={() => router.push(`${lvl2.url_path}`)}
                                                                            className={styles.secondLevel}
                                                                        >
                                                                            <ListItemText
                                                                                primary={
                                                                                    <Typography
                                                                                        variant="label"
                                                                                        size="14"
                                                                                        letter="uppercase"
                                                                                        type="bold"
                                                                                    >
                                                                                        {`${lvl2.name}`}
                                                                                    </Typography>
                                                                                }
                                                                            />
                                                                        </ListItem>
                                                                    </>
                                                                ))}
                                                        </List>
                                                    </Collapse>
                                                </>
                                            ) : (
                                                <ListItem button onClick={() => router.push(`${lvl1.url_path}`)} className={styles.firstLevel}>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="label" size="14" letter="uppercase" type="bold">
                                                                {`${lvl1.name}`}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            )}
                                        </>
                                    ))}
                            </List>
                        </Collapse>
                    </>
                ))}
        </>
    );
};

export default CategoryList;
