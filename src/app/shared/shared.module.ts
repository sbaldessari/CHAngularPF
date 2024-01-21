import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from './nombre-completo.pipe';
import { TitulosDirective } from './titulos.directive';



@NgModule({
  declarations: [
    NombreCompletoPipe,
    TitulosDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NombreCompletoPipe,
    TitulosDirective
  ]
})
export class SharedModule { }
