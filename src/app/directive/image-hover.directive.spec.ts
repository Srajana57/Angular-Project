import { ImageHoverDirective } from './image-hover.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('ImageHoverDirective', () => {
  let el: ElementRef;
  let renderer: Renderer2;
  let directive: ImageHoverDirective;

  beforeEach(() => {
    el = { nativeElement: document.createElement('div') } as ElementRef;
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeStyle']);
    directive = new ImageHoverDirective(el, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply styles on mouse enter', () => {
    directive.onMouseEnter();
    expect(renderer.setStyle).toHaveBeenCalledWith(el.nativeElement, 'transform', 'scale(1.1)');

  });

  it('should remove styles on mouse leave', () => {
    directive.onMouseLeave();
    expect(renderer.setStyle).toHaveBeenCalledWith(el.nativeElement, 'transform', 'scale(1)');

  });
});
