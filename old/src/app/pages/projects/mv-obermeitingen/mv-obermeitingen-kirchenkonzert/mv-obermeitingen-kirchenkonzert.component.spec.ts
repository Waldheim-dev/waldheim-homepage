import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvObermeitingenKirchenkonzertComponent } from './mv-obermeitingen-kirchenkonzert.component';

describe('MvObermeitingenFaschingComponent', () => {
  let component: MvObermeitingenKirchenkonzertComponent;
  let fixture: ComponentFixture<MvObermeitingenKirchenkonzertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MvObermeitingenKirchenkonzertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MvObermeitingenKirchenkonzertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
