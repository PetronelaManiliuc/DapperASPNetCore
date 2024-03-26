import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-assign-employee-dialog',
  templateUrl: './assign-employee-dialog.component.html',
  styleUrls: ['./assign-employee-dialog.component.css']
})
export class AssignEmployeeDialogComponent {

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm!: FormGroup;
  projectId = 0;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any,
    private employeeService: EmployeeService, private dialogRef: MatDialogRef<AssignEmployeeDialogComponent>) {
    if (data) {

      data.employees.forEach((obj: any) => {
        this.dropdownList.push({ item_id: obj.id, item_text: obj.name });
        this.projectId = data.projectId;
        //  console.log(obj);
        // if (this.projectId == 6) {
        //   this.selectedItems.push({ item_id: obj.id, item_text: obj.name });
        // }
      });

      this.dropDownForm = this.fb.group({
        myItems: [this.selectedItems]
      });
    }

    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      maxHeight: 197,
      searchPlaceholderText: 'Search employee',
    };

    this.setForm();
  }

  public setForm() {
    this.dropDownForm = new FormGroup({
      name: new FormControl(this.dropdownList, Validators.required),
    });

  }

  get f() {
    return this.dropDownForm.controls;
  }

  public save() {

    if (this.dropDownForm.invalid) {
      this.dropDownForm.markAllAsTouched();
      return;
    }

    this.assignEmployee();
  }

  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
  }

  public onItemSelect(item: any) {
    this.selectedItems.push({ item_id: item.item_id, item_text: item.item_text });
    console.log(item);
  }
  public onDeSelect(item: any) {
    // this.selectedItems.pop();
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    // console.log(item);
  }

  public onSelectAll(items: any) {
    items.forEach((i: any) => {
      this.selectedItems.push({ item_id: i.item_id, item_text: i.item_text });
    });
  }

  public onDeSelectAll(items: any) {
    console.log(items);
    items.forEach((i: any) => {
      this.selectedItems.splice(this.selectedItems.indexOf(i), 1);
    });
  }

  assignEmployee(): void {
    var newEmployeeProject: { employeeId: any; projectId: number; }[] = [];

    this.selectedItems.forEach((obj: any) => {
      console.log(obj);
      newEmployeeProject.push({ employeeId: obj.item_id, projectId: this.projectId });
    });

    this.employeeService.assignToProject(newEmployeeProject).subscribe({
      next: (data) => {
        console.log(`assign successfully ${data}`);
        return;

      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.dialogRef.close(true);
  }

}