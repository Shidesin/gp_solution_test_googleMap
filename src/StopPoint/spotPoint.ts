//если нужно допилить id остановки то найти ее можно через строку которая начинается на "s",

export interface stopPiontType {
    name: string
    lat: number
    lng: number
}

export function refactorDataToArray(str: string) {
    const arr = str.split(';');
    const result: stopPiontType[] = [];
    for (let i = 1; i < arr.length; i ++) {
        if (arr[i].length === 7 && arr[i-1].length === 7) {
            const name = isNaN(+arr[i-3]) ? arr[i-3] : '';
            result.push({name, lng:separationOfCoordinates(arr[i-1]), lat: separationOfCoordinates (arr[i])})
        }
    }
    return result;
}

export const changeEmptyName = (arr: any[]) => {
    const result: stopPiontType[] = arr
    for (let i = 1; i < arr.length; i++){
        if (!result[i].name){
            result[i].name = result[i-1].name
        }
    }
    return result
}

export function separationOfCoordinates(str: string): number {
    return Number(`${str.slice(0, 2)}.${str.slice(2, 7)}`)
}
