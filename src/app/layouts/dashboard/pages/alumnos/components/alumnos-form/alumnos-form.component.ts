import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrl: './alumnos-form.component.scss'
})
export class AlumnosFormComponent implements OnChanges {

  alumnoForm: FormGroup;

  @Output()
  alumnoSubmitted = new EventEmitter();

  @Input()
  alumnoAEditar: any

  constructor(private fb: FormBuilder) {
    this.alumnoForm = this.fb.group({
      legajo: this.fb.control(''),
      numeroDocumento: this.fb.control('', Validators.required),
      genero: this.fb.control('', Validators.required),
      nombre: this.fb.control('', Validators.required),
      apellido: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      telefono: this.fb.control('', Validators.required)
    })
  }

  ngOnChanges() {
    if (this.alumnoAEditar) {      
      this.alumnoForm.setValue(this.alumnoAEditar)
    }
  }

  onSubmit(): void{
    if(this.alumnoForm.invalid){
      this.alumnoForm.markAllAsTouched()
    } else{
      if(this.alumnoForm.value.legajo == null){
        this.alumnoForm.value.legajo = ''
      }
      this.alumnoSubmitted.emit(this.alumnoForm.value)
      this.alumnoForm.reset()
    }
  }

}
