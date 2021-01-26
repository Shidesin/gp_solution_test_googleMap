import React from 'react';
import {MapBoxContainer} from '../Map';
import styled from './Content.module.css'


const Content: React.FC = () => {
    return (
        <div className={styled.contentBox}>
            <MapBoxContainer/>
        </div>
    )
}

export default Content;