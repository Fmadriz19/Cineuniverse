import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasEditComponent } from './salas-edit.component';

describe('SalasEditComponent', () => {
  let component: SalasEditComponent;
  let fixture: ComponentFixture<SalasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalasEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
