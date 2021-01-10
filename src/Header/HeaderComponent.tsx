import React from 'react';
import {useDispatch} from 'react-redux';
import {showMenu} from '../App';
import {Button, Layout} from 'antd';
import styled from './HeaderComponent.module.css';
import 'antd/dist/antd.css';

const {Header} = Layout;

export const HeaderComponent: React.FC = () => {
    const dispatch = useDispatch()
    const showDrawer = () => {
        dispatch(showMenu(true))
    };
    return (
        <Header>
            <Button type="primary" onClick={showDrawer} className={styled.button}>
                Меню
            </Button>

        </Header>


    )
}