import React from 'react';
import {Tabs} from 'antd';
import {TransportRoutes} from '../TransportRoutes';
import {StopPointsContainer} from '../StopPoints';

import 'antd/dist/antd.css';
import style from './Sidebar.module.css'

const {TabPane} = Tabs;

type propsType = {
    tabHendler: (key: string) => void
    clearMarkersRoute: () => void
}

export const Sidebar: React.FC<propsType> = ({tabHendler, clearMarkersRoute}) => {
    console.log('render Sidebar')

    return (
        <Tabs defaultActiveKey={'transportRoutes'} onTabClick={tabHendler} type="card" className={style.tabs_containrer}>
            <TabPane tab={'Остановочные пункты'} key="stops" className={style.stops}>
                <StopPointsContainer />
            </TabPane>
            <TabPane  tab={'Транспортные маршруты'} key="transportRoutes" className={style.transportRoutes}>
                <TransportRoutes clearMarkersRoute={clearMarkersRoute}/>
            </TabPane>
        </Tabs>
    )
}