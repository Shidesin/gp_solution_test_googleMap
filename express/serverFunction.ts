interface stopPointType {
    id: string
    name: string
    lat: number
    lng: number
}

interface IRoutes {
    routeNum: string,
    transport: string,
    operator: string,
    validityPeriods: string[] | string,
    routeTag: string,
    routeType: string,
    routeName: string,
    weekdays: string,
    routeID: string,
    routeStops: string[]
}

function refactorStopPointsMapDataToArray(str: string) {
    const result: stopPointType[] = [];
    const arrPoint = str.split('\n');
    for (let i = 1; i < arrPoint.length; i++) {
        const pointInfo = arrPoint[i].split(';')
        for (let j = 0; j < pointInfo.length; j++) {
            const id = pointInfo[0]
            if (pointInfo[j].length === 7 && pointInfo[j - 1].length === 7) {
                const createName = isNaN(+pointInfo[j - 3]) ? pointInfo[j - 3] : '';
                const name = createName && createName.replace(/~/g, ' ').trim();
                const lng = +pointInfo[j - 1] / 100000;
                const lat = +pointInfo[j] / 100000;
                result.push({lat: lat, lng: lng, name: name, id: id})
            }
        }
    }
    return result;
}

const changeEmptyName = (arr: any[]) => {
    const result: stopPointType[] = arr
    for (let i = 1; i < arr.length; i++) {
        if (!result[i].name) {
            result[i].name = result[i - 1].name
        }
    }
    return result
}

const refactorRoutesToArray = (str: string) => {
    const result: IRoutes[] = []
    const arrayRoutes = str.split('\n');
    for (let i = 0; i < arrayRoutes.length; i++) {

        let route = arrayRoutes[i].split(';');

        let routeNum = route[0] !== ''? route[0] : result[i-1].routeNum;

        result.push({
            routeNum: routeNum,
            transport: route[3],
            operator: route[4],
            validityPeriods: route[5] && route[5].split(','),
            routeTag: route[7],
            routeType: route[8],
            routeName: route[10],
            weekdays: route[11],
            routeID: route[12],
            routeStops: route[14] ? route[14].split(',') : [],
        })
    }
    return result
}


const validRoutes = (arrayAllRoutes: IRoutes[]) => {
    return arrayAllRoutes.filter(item => item.routeTag === '')
}

module.exports = {
    refactorStopPointsMapDataToArray,
    changeEmptyName,
    refactorRoutesToArray,
    validRoutes,
}