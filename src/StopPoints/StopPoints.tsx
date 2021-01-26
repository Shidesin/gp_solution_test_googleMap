import React from 'react';
import styled from './StopPoints.module.css';


export const StopPoints: React.FC = React.memo(() => {
    console.log('render StopPoints')

    return (
        <div className={styled.main_box}>
            Тута будет список остановок!
        </div>
    )
})