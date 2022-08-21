import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewobeOnlinesoftwareComponent } from './sewobe-onlinesoftware.component';

describe('OnlinesoftwareComponent', () => {
  let component: SewobeOnlinesoftwareComponent;
  let fixture: ComponentFixture<SewobeOnlinesoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SewobeOnlinesoftwareComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SewobeOnlinesoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
