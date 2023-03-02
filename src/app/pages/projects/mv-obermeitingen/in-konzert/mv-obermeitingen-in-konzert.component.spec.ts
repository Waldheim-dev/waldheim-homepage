import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvObermeitingenInKonzertComponent } from './mv-obermeitingen-in-konzert.component';

describe('InKonzertComponent', () => {
  let component: MvObermeitingenInKonzertComponent;
  let fixture: ComponentFixture<MvObermeitingenInKonzertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MvObermeitingenInKonzertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MvObermeitingenInKonzertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
