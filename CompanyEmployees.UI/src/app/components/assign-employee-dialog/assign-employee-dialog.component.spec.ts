import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmployeeDialogComponent } from './assign-employee-dialog.component';

describe('AssignEmployeeDialogComponent', () => {
  let component: AssignEmployeeDialogComponent;
  let fixture: ComponentFixture<AssignEmployeeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignEmployeeDialogComponent]
    });
    fixture = TestBed.createComponent(AssignEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
