import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistsManageComponent } from './therapists-manage.component';

describe('TherapistsManageComponent', () => {
  let component: TherapistsManageComponent;
  let fixture: ComponentFixture<TherapistsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapistsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
