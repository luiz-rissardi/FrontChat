import { Injectable } from "@angular/core"
import { Validate } from "../interfaces/validate.interface"

@Injectable({
    providedIn:"root"
})

class ValidateForm implements Validate{
    constructor() {

    }
    
    validateEmail(email: string): boolean {
        const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i
        return emailRegex.test(email)
    }
}

export {
    ValidateForm
}