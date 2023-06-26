import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceStudymasterComponent } from './interface-studymaster.component';

describe('StudymasterComponent', () => {
  let component: InterfaceStudymasterComponent;
  let fixture: ComponentFixture<InterfaceStudymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterfaceStudymasterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InterfaceStudymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
