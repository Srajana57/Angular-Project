// image-hover.directive.ts

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImageHover]'
})
export class ImageHoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.addHoverStyles();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeHoverStyles();
  }

  private addHoverStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.1)');
  }

  private removeHoverStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)'); 
    
  }
}

