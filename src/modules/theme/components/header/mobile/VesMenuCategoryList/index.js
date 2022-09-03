/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-danger */
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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';

import getPath from '@helper_getpath';
import { setResolver, getResolver } from '@helper_localstorage';
import Typography from '@common_typography';

import useStyles from './style';

const CategoryList = (props) => {
    const { data, storeConfig, toggleDrawer } = props;

    const styles = useStyles();
    const router = useRouter();

    const [categoryKeyState, setCategoryKeyState] = useState(null);
    const [categoryDataState, setcategoryDataState] = useState(null);

    const cmsPages = storeConfig && storeConfig.cms_page ? storeConfig.cms_page.split(',') : [];

    useEffect(() => {
        let categoryKey;
        let categoryData;

        if (data && data.vesMenu.items && categoryKeyState === null && categoryDataState === null) {
            categoryData = data.vesMenu.items.map((el) => el);
            setcategoryDataState(categoryData);

            if (categoryData) {
                categoryData.map((lvl0) => {
                    if (lvl0.name.includes('<')) {
                        const tempName = lvl0.name.split('<');
                        categoryKey = { ...categoryKey, [`${lvl0.id}-${tempName[0]}`]: false };
                    } else {
                        categoryKey = { ...categoryKey, [`${lvl0.id}-${lvl0.name}`]: false };
                    }

                    if (lvl0.children.length > 0) {
                        categoryKey = { ...categoryKey, [`${lvl0.id}-${lvl0.name}`]: false };
                        // eslint-disable-next-line array-callback-return
                        lvl0.children.map((lvl1) => {
                            categoryKey = { ...categoryKey, [`${lvl1.id}-${lvl1.name}`]: false };

                            if (lvl1.children.length > 0) {
                                // eslint-disable-next-line array-callback-return
                                lvl1.children.map((lvl2) => {
                                    categoryKey = { ...categoryKey, [`${lvl2.id}-${lvl2.name}`]: false };
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

    const handleClickMenu = async (cat) => {
        if (cat.link) {
            const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
            const urlResolver = getResolver();
            if (cat.link_type === 'category_link') {
                urlResolver[link] = {
                    type: 'CATEGORY',
                    id: cat.category_id,
                };
                await setResolver(urlResolver);
                router.push('/[...slug]', link);
            } else {
                const cms = cmsPages.find((cmsPage) => cmsPage === link.replace('/', ''));
                if (cms) {
                    urlResolver[link] = {
                        type: 'CMS_PAGE',
                    };
                    await setResolver(urlResolver);
                    router.push('/[...slug]', link);
                } else {
                    router.push(link);
                }
            }
        }
    };

    return (
        <>
            {categoryDataState &&
                categoryKeyState &&
                categoryDataState.map((lvl0) => (
                    <>
                        {lvl0.children.length > 0 ? (
                            <>
                                <ListItem
                                    button
                                    onClick={() => handleClick0(`${lvl0.id}-${lvl0.name.includes('<') ? lvl0.name.split('<')[0] : lvl0.name}`)}
                                    className={styles.zeroLevel}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="label" size="14" letter="uppercase" type="bold">
                                                <div dangerouslySetInnerHTML={{ __html: lvl0.name }} />
                                            </Typography>
                                        }
                                    />
                                    {categoryKeyState[`${lvl0.id}-${lvl0.name.includes('<') ? lvl0.name.split('<')[0] : lvl0.name}`] ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItem>
                                <Collapse
                                    in={categoryKeyState[`${lvl0.id}-${lvl0.name.includes('<') ? lvl0.name.split('<')[0] : lvl0.name}`]}
                                    timeout="auto"
                                >
                                    <List component="div" disablePadding>
                                        <ListItem
                                            button
                                            onClick={() => {
                                                toggleDrawer(false);
                                                handleClickMenu(lvl0);
                                            }}
                                            className={styles.firstLevel}
                                        >
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
                                                                onClick={
                                                                    () =>
                                                                        // eslint-disable-next-line implicit-arrow-linebreak
                                                                        handleClick0(
                                                                            // eslint-disable-next-line comma-dangle
                                                                            `${lvl1.id}-${
                                                                                lvl1.name.includes('<') ? lvl1.name.split('<')[0] : lvl1.name
                                                                                // eslint-disable-next-line comma-dangle
                                                                            }}`
                                                                        )
                                                                    // eslint-disable-next-line react/jsx-curly-newline
                                                                }
                                                                className={styles.firstLevel}
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        <Typography variant="label" size="14" letter="uppercase" type="bold">
                                                                            <div dangerouslySetInnerHTML={{ __html: lvl1.name }} />
                                                                        </Typography>
                                                                    }
                                                                />
                                                                {categoryKeyState[
                                                                    `${lvl1.id}-${lvl1.name.includes('<') ? lvl1.name.split('<')[0] : lvl1.name}}`
                                                                ] ? (
                                                                    <ExpandLess />
                                                                ) : (
                                                                    <ExpandMore />
                                                                )}
                                                            </ListItem>
                                                            <Collapse
                                                                in={
                                                                    categoryKeyState[
                                                                        `${lvl1.id}-${lvl1.name.includes('<') ? lvl1.name.split('<')[0] : lvl1.name}}`
                                                                    ]
                                                                }
                                                                timeout="auto"
                                                            >
                                                                <List component="div" disablePadding>
                                                                    <ListItem
                                                                        button
                                                                        onClick={() => {
                                                                            toggleDrawer(false);
                                                                            handleClickMenu(lvl1);
                                                                        }}
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
                                                                                    onClick={() => {
                                                                                        toggleDrawer(false);
                                                                                        handleClickMenu(lvl2);
                                                                                    }}
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
                                                                                                <div
                                                                                                    dangerouslySetInnerHTML={{ __html: lvl2.name }}
                                                                                                />
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
                                                        <ListItem
                                                            button
                                                            onClick={() => {
                                                                toggleDrawer(false);
                                                                handleClickMenu(lvl1);
                                                            }}
                                                            className={styles.firstLevel}
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    <Typography variant="label" size="14" letter="uppercase" type="bold">
                                                                        <div dangerouslySetInnerHTML={{ __html: lvl1.name }} />
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
                        ) : (
                            <ListItem
                                button
                                onClick={() => {
                                    toggleDrawer(false);
                                    handleClickMenu(lvl0);
                                }}
                                className={styles.zeroLevel}
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="label" size="14" letter="uppercase" type="bold">
                                            <div dangerouslySetInnerHTML={{ __html: lvl0.name }} />
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        )}
                    </>
                ))}
        </>
    );
};

export default CategoryList;
