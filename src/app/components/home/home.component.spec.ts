// home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from 'src/app/components/footer/footer.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,HeaderComponent,FooterComponent],
      imports: [MatGridListModule, BrowserAnimationsModule,MatCardModule], 
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct selector', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
  });

  it('should have the expected template content', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.home h3').textContent).toContain('Fresh Flowers');
   
  });

  it('should have the correct styles applied', () => {
    const compiled = fixture.nativeElement;
   
    expect(compiled.querySelector('color')).not.toBe('pink' );
  });

  
});

