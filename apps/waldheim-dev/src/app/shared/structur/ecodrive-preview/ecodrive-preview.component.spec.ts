import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcodrivePreviewComponent } from './ecodrive-preview.component';

describe('EcodrivePreviewComponent', () => {
  let component: EcodrivePreviewComponent;
  let fixture: ComponentFixture<EcodrivePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcodrivePreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcodrivePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
