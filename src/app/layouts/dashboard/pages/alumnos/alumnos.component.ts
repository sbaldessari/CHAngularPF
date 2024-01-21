import { Component } from '@angular/core';
import { Alumno } from './models';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {

  passEditar: Alumno | null = null

  displayedColumns: string[] = [
    'legajo', 'numeroDocumento', 
    'genero', 'apeNom', 
    'email', 'telefono', 
    'editar', 'eliminar'];


  dataSource: Alumno[] = [
    {
      legajo: 1,
      numeroDocumento: 88888888,
      genero: 'Masculino',
      nombre: 'Jorge',
      apellido: 'Perez',
      email: 'jperez@academianatural.com',
      telefono: '123456789'
    },
    {
      legajo: 2,
      numeroDocumento: 99999999,
      genero: 'Femenino',
      nombre: 'Gilda',
      apellido: 'Lopez',
      email: 'glopez@academianatural.com',
      telefono: '987654321'
    }
  ];

  onAlumnoSubmitted(ev: Alumno): void {
    if(ev.legajo.toString() != ""){
      this.dataSource = [...this.dataSource.filter((w) => w.legajo != ev.legajo)]
      this.dataSource = [...this.dataSource, ev].sort((a, b) => (a.legajo < b.legajo ? -1 : 1))      
    }  
    else{
      const id = this.dataSource.length + 1
      this.dataSource = [...this.dataSource, {...ev, legajo: id}].sort((a, b) => (a.legajo < b.legajo ? -1 : 1))
    }    
  }

  onAlumnoEdited(ev: Alumno): void {
    this.passEditar = ev
  }

  onAlumnoDeleted(ev: Alumno): void {
    this.dataSource = [...this.dataSource.filter((w) => w.legajo != ev.legajo)].sort((a, b) => (a.legajo < b.legajo ? -1 : 1))
  }

}
