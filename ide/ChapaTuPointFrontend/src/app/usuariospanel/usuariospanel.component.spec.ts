import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariospanelComponent } from './usuariospanel.component';

describe('UsuariospanelComponent', () => {
  let component: UsuariospanelComponent;
  let fixture: ComponentFixture<UsuariospanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariospanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariospanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
