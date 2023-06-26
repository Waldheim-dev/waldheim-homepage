import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaldheimDevHomepageComponent } from './waldheim-dev-homepage.component';

describe('HomepageComponent', () => {
  let component: WaldheimDevHomepageComponent;
  let fixture: ComponentFixture<WaldheimDevHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaldheimDevHomepageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaldheimDevHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
