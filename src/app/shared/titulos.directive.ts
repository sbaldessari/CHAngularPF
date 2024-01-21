import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTitulos]'
})
export class TitulosDirective {

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    renderer.setStyle(elementRef.nativeElement, 'font-size', '20px')
   }

}
