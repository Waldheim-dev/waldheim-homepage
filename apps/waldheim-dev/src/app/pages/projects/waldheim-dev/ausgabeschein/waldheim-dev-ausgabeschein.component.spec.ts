import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaldheimDevAusgabescheinComponent } from './waldheim-dev-ausgabeschein.component';

describe('AusgabescheinComponent', () => {
  let component: WaldheimDevAusgabescheinComponent;
  let fixture: ComponentFixture<WaldheimDevAusgabescheinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaldheimDevAusgabescheinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaldheimDevAusgabescheinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
