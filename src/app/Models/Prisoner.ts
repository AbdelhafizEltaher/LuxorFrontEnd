export interface Prizenor {
    id: number,
    serial: number,
    name: string,
    age: number,
    birthDate: Date,
    nationalNumber: number,
    adress: string,
    nickName: string,
    jopTitle: string,
    accusation: string,
    judgmentTitle: string,
    fileNumber: number,
    kadyaNumber: number,
    galsaDate: Date,
    galsaNumber: number,
    startDate: Date,
    endDate: Date,
    Notes: string,
    outSource? : string
}

export interface User {
    userName: string,
    code: number,
    email: string,
    password: string,
    phoneNumber: string
}


export interface LoginData {
    userName: string,
    code: number,
    password: string,
}