import { Injectable, Inject } from "@angular/core"

export class UsersMockService {

    constructor(
        @Inject('USER_TOKEN') userToken: string,
        @Inject('API_URL') url: string,
        ) { 
    }

    getUsers() {
        return ['Juan FALSO','Lucas FALSO','Matias FALSO']
    }

}