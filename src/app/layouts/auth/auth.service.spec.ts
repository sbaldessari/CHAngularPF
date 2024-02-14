import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { User } from "../dashboard/pages/users/models"

describe('Pruebas de AuthService', () => {

    let authService: AuthService
    let httpController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
            imports: [HttpClientTestingModule]
        })

        authService = TestBed.inject(AuthService)
        httpController = TestBed.inject(HttpTestingController)
    })

    it('AuthService debe estar definido', () => {
        expect(authService).toBeTruthy()
    })

    it('Al llamar login() debe establecer un AuthUser', () => {

        const MOCK_RESPONSE: User[] = [
            {
              "id": "as99",
              "firstName": "MOCKFIRSTNAME",
              "lastName": "MOCKLASTNAME",   
              "role": "ADMIN", 
              "phone": "12345678",
              "email": "mock@academiananatural.com.ar",
              "password": "Abcd1234",
              "createdAt": new Date,
              "token": "dkfor4ks6hjdft9"
            }
        ]

        authService.login({ email: 'mock@academiananatural.com.ar', password: 'Abcd1234' }).subscribe({
            next: (user) => {
                expect(authService.authUser).toBeTruthy()
                expect(authService.authUser).toEqual(MOCK_RESPONSE[0])
            }
        })

        httpController.expectOne({
            url: 'http://localhost:3000/users?email=mock@academiananatural.com.ar&password=Abcd1234',
            method: 'GET'
        }).flush(MOCK_RESPONSE)

    })

})