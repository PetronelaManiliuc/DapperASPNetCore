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
  public loadContent: boolean = false;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any,
    private employeeService: EmployeeService) {
    if (data) {
      data.employees.forEach((obj: any) => {
        this.dropdownList.push({ item_id: obj.id, item_text: obj.name });

        if (obj.companyId == data.companyId) {
          this.selectedItems.push({ item_id: obj.id, item_text: obj.name });
        }
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
    this.loadContent = true;
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
    // console.log(this.selectedItems);
    if (this.dropDownForm.invalid) {
      this.dropDownForm.markAllAsTouched();
      return;
    }
    this.assignEmployee();
    // console.log(this.dropDownForm);
    // console.log(this.dropDownForm.value);
  }

  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
  }

  public onFilterChange(item: any) {
    console.log(item);
  }
  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
    this.selectedItems.push(item.name);
    console.log(item);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }

  assignEmployee(): void {
    this.employeeService.assignToProject(this.dropDownForm.value).subscribe({
      next: (data) => {
        console.log(`assign successfully ${data}`);
        return;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  // @ViewChild('multiSelect') multiSelect: any;
  // formGroup!: FormGroup;
  // loadContent: boolean = false;
  // name = '';
  // dropdownList: { item_id: number; item_text: string }[] = [];
  // settings = {};
  // // selectedItems = [];
  // selectedItems: { name: string }[] = [];

  // constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  //   private dialogRef: MatDialogRef<AssignEmployeeDialogComponent>) {
  //   if (data) {
  //     data.employees.forEach((obj: any) => {
  //       this.dropdownList.push({ item_id: obj.id, item_text: obj.name });

  //       // if (obj.companyId == data.companyId) {
  //       //   this.selectedItems.push(obj.name);
  //       // }
  //     });
  //   }

  //   this.settings = {
  //     singleSelection: false,
  //     idField: 'item_id',
  //     textField: 'item_text',
  //     enableCheckAll: true,
  //     selectAllText: 'Select all',
  //     unSelectAllText: 'Reset',
  //     allowSearchFilter: true,
  //     limitSelection: -1,
  //     clearSearchFilter: true,
  //     maxHeight: 197,
  //     itemsShowLimit: 3,
  //     searchPlaceholderText: 'Search employee',
  //     noDataAvailablePlaceholderText: 'no data',
  //     closeDropDownOnSelection: false,
  //     showSelectedItemsAtTop: false,
  //     defaultOpen: false,
  //   };

  //   this.setForm();
  // }

  // // ngOnInit(): void {
  // //   this.data = [
  // //     { item_id: 1, item_text: 'Hanoi' },
  // //     { item_id: 2, item_text: 'Lang Son' },
  // //     { item_id: 3, item_text: 'Vung Tau' },
  // //     { item_id: 4, item_text: 'Hue' },
  // //     { item_id: 5, item_text: 'Cu Chi' },
  // //   ];

  // //   this.settings = {
  // //     singleSelection: false,
  // //     idField: 'item_id',
  // //     textField: 'item_text',
  // //     enableCheckAll: true,
  // //     selectAllText: 'Select all',
  // //     unSelectAllText: 'Reset',
  // //     allowSearchFilter: true,
  // //     limitSelection: -1,
  // //     clearSearchFilter: true,
  // //     maxHeight: 197,
  // //     itemsShowLimit: 3,
  // //     searchPlaceholderText: 'Search employee',
  // //     noDataAvailablePlaceholderText: 'no data',
  // //     closeDropDownOnSelection: false,
  // //     showSelectedItemsAtTop: false,
  // //     defaultOpen: false,
  // //   };

  // //   this.setForm();
  // // }

  // onConfirmClick(): void {
  //   this.dialogRef.close(true);
  // }

  // public setForm() {
  //   console.log(this.dropdownList);
  //   this.formGroup = new FormGroup({
  //     name: new FormControl(this.dropdownList, Validators.required),
  //   });
  //   this.loadContent = true;
  // }

  // get f() {
  //   return this.formGroup.controls;
  // }

  // public save() {
  //   if (this.formGroup.invalid) {
  //     this.formGroup.markAllAsTouched();
  //     return;
  //   }
  //   console.log(this.formGroup.value);
  // }

  // public resetForm() {
  //   // beacuse i need select all crickter by default when i click on reset button.
  //   this.setForm();
  //   this.multiSelect.toggleSelectAll();
  //   // i try below variable isAllItemsSelected reference from your  repository but still not working
  //   // this.multiSelect.isAllItemsSelected = true;
  // }

  // public onFilterChange(item: any) {
  //   console.log(item);
  // }
  // public onDropDownClose(item: any) {
  //   console.log(item);
  // }

  // public onItemSelect(item: any) {
  //   console.log(item);
  // }
  // public onDeSelect(item: any) {
  //   console.log(item);
  // }

  // public onSelectAll(items: any) {
  //   console.log(items);
  // }
  // public onDeSelectAll(items: any) {
  //   console.log(items);
  // }
}