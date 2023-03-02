import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaldheimItHomepageComponent } from './waldheim-it-homepage.component';

describe('HomepageComponent', () => {
  let component: WaldheimItHomepageComponent;
  let fixture: ComponentFixture<WaldheimItHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaldheimItHomepageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaldheimItHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
