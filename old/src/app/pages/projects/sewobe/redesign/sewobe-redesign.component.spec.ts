import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewobeRedesignComponent } from './sewobe-redesign.component';

describe('RedesignComponent', () => {
  let component: SewobeRedesignComponent;
  let fixture: ComponentFixture<SewobeRedesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SewobeRedesignComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SewobeRedesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
