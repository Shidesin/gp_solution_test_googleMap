import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {showMenuSelector} from '../selectors';
import {showMenu} from '../App';
import {Drawer, Menu} from 'antd';
import {CarFilled, ProfileTwoTone, CompassFilled} from '@ant-design/icons'
import 'antd/dist/antd.css';
import styled from './Sidebar.module.css'

const styledIcon = {
    fontSize: '25px'
}

export const Sidebar: React.FC = () => {
    const dispatch = useDispatch()
    const visibleMenu = useSelector(showMenuSelector)
    const onClose = () => {
        dispatch(showMenu(false))
    };

    return (
        <>
            <Drawer
                title="Меню"
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visibleMenu}
            >
                <nav>
                    <Menu>
                        <Menu.Item key="1" icon={<CompassFilled style={styledIcon}/>}>
                            <NavLink to={'/map'} activeClassName={styled.activeLink}>
                                Карта
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ProfileTwoTone style={styledIcon}/>}>
                            <NavLink to={'/transportRoutes'} activeClassName={styled.activeLink}>
                                Маршруты
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<CarFilled style={styledIcon}/>}>
                            <NavLink to={'/searchTrack'} activeClassName={styled.activeLink}>
                                Транспорт
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </nav>
            </Drawer>
        </>
    )
}