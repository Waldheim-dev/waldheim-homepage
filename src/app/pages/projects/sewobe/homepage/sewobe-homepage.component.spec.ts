import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewobeHomepageComponent } from './sewobe-homepage.component';

describe('HomepageComponent', () => {
  let component: SewobeHomepageComponent;
  let fixture: ComponentFixture<SewobeHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SewobeHomepageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SewobeHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
