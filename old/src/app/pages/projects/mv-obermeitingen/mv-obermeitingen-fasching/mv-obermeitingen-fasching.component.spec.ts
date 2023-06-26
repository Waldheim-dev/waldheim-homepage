import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvObermeitingenFaschingComponent } from './mv-obermeitingen-fasching.component';

describe('MvObermeitingenFaschingComponent', () => {
  let component: MvObermeitingenFaschingComponent;
  let fixture: ComponentFixture<MvObermeitingenFaschingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MvObermeitingenFaschingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MvObermeitingenFaschingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
