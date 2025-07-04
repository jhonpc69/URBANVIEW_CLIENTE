import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalesmatenimeintoComponent } from './localesmatenimeinto.component';

describe('LocalesmatenimeintoComponent', () => {
  let component: LocalesmatenimeintoComponent;
  let fixture: ComponentFixture<LocalesmatenimeintoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalesmatenimeintoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalesmatenimeintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
