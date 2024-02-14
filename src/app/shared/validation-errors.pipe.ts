import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationErrors'
})
export class ValidationErrorsPipe implements PipeTransform {

  transform(errors?: ValidationErrors | null, ...args: unknown[]): unknown {

    if(!!errors) {
      let messages = []

      if(errors['required']) messages.push('Este campo es requerido')        
      if(errors['email']) messages.push('No es un email valido')

      return messages.join('. ') + '.'

    }

    return null;
  }

}
