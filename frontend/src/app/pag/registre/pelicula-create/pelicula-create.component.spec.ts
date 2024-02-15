import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaCreateComponent } from './pelicula-create.component';

describe('PeliculaCreateComponent', () => {
  let component: PeliculaCreateComponent;
  let fixture: ComponentFixture<PeliculaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeliculaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
