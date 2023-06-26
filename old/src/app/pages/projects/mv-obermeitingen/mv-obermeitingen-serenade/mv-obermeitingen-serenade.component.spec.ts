import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MvObermeitingenSerenadeComponent } from './mv-obermeitingen-serenade.component';

describe('MvObermeitingenSerenadeComponent', () => {
  let component: MvObermeitingenSerenadeComponent;
  let fixture: ComponentFixture<MvObermeitingenSerenadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MvObermeitingenSerenadeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MvObermeitingenSerenadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
