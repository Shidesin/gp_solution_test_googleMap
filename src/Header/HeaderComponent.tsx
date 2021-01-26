import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Layout} from 'antd';
import styled from './HeaderComponent.module.css';
import 'antd/dist/antd.css';

const {Header} = Layout;

export const HeaderComponent: React.FC = () => {

    const showDrawer = () => {
        alert('Тут что-нить обязательно будет!')
    };
    return (
        <Header>
            <Button type="primary" onClick={showDrawer} className={styled.button}>
                НезабудьПоменятьШапку!!!
            </Button>
        </Header>
    )
}