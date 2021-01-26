import React from 'react';
import {StopPoints} from './StopPoints';


export const StopPointsContainer: React.FC = React.memo( () => {
    console.log('render StopPointsContainer')

    return (
        <div>
            <StopPoints />
        </div>
    )
})