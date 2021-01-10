const { v4: uuidv4 } = require('uuid');

interface stopPiontType {
    name: string
    lat: number
    lng: number
    id: string
}

function refactorDataToArray(str: string) {
    const arr = str.split(';');
    const result: stopPiontType[] = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length === 7 && arr[i - 1].length === 7) {
            const name = isNaN(+arr[i - 3]) ? arr[i - 3] : '';
            result.push({
                name,
                lng: separationOfCoordinates(arr[i - 1]),
                lat: separationOfCoordinates(arr[i]),
                id: uuidv4()
            })
        }
    }
    return result;
}

function separationOfCoordinates(str: string): number {
    return Number(`${str.slice(0, 2)}.${str.slice(2, 7)}`)
}

const changeEmptyName = (arr: any[]) => {
    const result: stopPiontType[] = arr
    for (let i = 1; i < arr.length; i++) {
        if (!result[i].name) {
            result[i].name = result[i - 1].name
        }
    }
    return result
}

module.exports = {
    refactorDataToArray,
    changeEmptyName
}