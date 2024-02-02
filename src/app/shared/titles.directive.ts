import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTitles]'
})
export class TitlesDirective {

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    renderer.setStyle(elementRef.nativeElement, 'font-size', '30px')
   }

}
