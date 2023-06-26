import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvObermeitingenHomepageComponent } from './mv-obermeitingen-homepage.component';

describe('HomepageComponent', () => {
  let component: MvObermeitingenHomepageComponent;
  let fixture: ComponentFixture<MvObermeitingenHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MvObermeitingenHomepageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MvObermeitingenHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
