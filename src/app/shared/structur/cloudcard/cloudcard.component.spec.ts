import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudcardComponent } from './cloudcard.component';

describe('CloudcardComponent', () => {
  let component: CloudcardComponent;
  let fixture: ComponentFixture<CloudcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
