import React from 'react';
import {useSelector} from 'react-redux';
import {searchRoutesSelector} from '../selectors';
import {AppRootStateType} from '../redux/store';
import {routesType} from '../App';
import {Route} from './Route';


type propsType = {
    clearMarkersRoute: () => void
}

export const RouteContainer: React.FC<propsType> = React.memo( ({clearMarkersRoute}) => {
    const searchRoutes: any = useSelector<AppRootStateType>(searchRoutesSelector)

    return (
        <div>
            {searchRoutes.map((item: routesType) => <Route  key={item.routeID} clearMarkersRoute={clearMarkersRoute}  routesType={item}/>)}
        </div>
    )

})