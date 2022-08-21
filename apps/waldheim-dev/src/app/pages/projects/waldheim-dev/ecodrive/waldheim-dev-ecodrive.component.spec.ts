import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaldheimDevEcodriveComponent } from './waldheim-dev-ecodrive.component';

describe('EcodriveComponent', () => {
  let component: WaldheimDevEcodriveComponent;
  let fixture: ComponentFixture<WaldheimDevEcodriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaldheimDevEcodriveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaldheimDevEcodriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
