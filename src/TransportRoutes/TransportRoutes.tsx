import React, {ChangeEvent} from 'react';
import styled from './TransportRoutes.module.css'
import {Input} from 'antd';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { setSearchWord } from '../App';
import { RouteContainer } from '../Route/RouteContainer';
const { Search } = Input;


type propsType = {
    clearMarkersRoute: () => void
}


export const TransportRoutes: React.FC<propsType> = React.memo(({clearMarkersRoute}) => {
    console.log('render TransportRoutes')

    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState<string>('')

    const changeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    }

    const onSearch = () => {
        dispatch(setSearchWord(searchValue))
        setSearchValue('')
    }

    return (
        <div className={styled.main_box}>
            <h3 style={{color: 'white'}}>Транспортные маршруты города Минска</h3>
            <div className={styled.search_box}>
                Введите название маршрута или остановки:
                <Search
                    onChange={changeSearchInput}
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    className={styled.input_search}
                    value={searchValue}
                />
            </div>
            <div className={styled.displayResult_container}>
                <RouteContainer clearMarkersRoute={clearMarkersRoute}/>
            </div>
        </div>
    )
})