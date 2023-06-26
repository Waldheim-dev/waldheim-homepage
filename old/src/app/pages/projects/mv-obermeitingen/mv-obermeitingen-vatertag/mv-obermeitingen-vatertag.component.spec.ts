import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvObermeitingenVatertagComponent } from './mv-obermeitingen-vatertag.component';

describe('MvObermeitingenVatertagComponent', () => {
  let component: MvObermeitingenVatertagComponent;
  let fixture: ComponentFixture<MvObermeitingenVatertagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MvObermeitingenVatertagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MvObermeitingenVatertagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
