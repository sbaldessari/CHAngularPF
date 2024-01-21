import { Pipe, PipeTransform } from '@angular/core';

export interface AlumnoPipe {
  nombre: string;
  apellido: string;
}

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: AlumnoPipe, ...args: unknown[]): unknown {
    const result = value.apellido + ', ' + value.nombre
    return result;
  }


}
