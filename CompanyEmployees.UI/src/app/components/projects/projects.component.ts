import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectResponse } from 'src/app/models/project.response';
import { ProjectService } from 'src/app/services/project.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  projects: ProjectResponse[] = [];
  isEditItems: boolean = false;

  constructor(private projectService: ProjectService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  edit(id: Number): void {
    this.router.navigate([`projects/detail/${id}`]);
  }

  add(): void {
    this.router.navigate([`projects/add`]);
  }

  openDialog(id: Number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log(confirmed);

        this.deleteProject(id);
        window.location.reload();
      }
    });
  }

  deleteProject(id: Number) {
    this.projectService.deleteProject(id);
  }

  addEmployee(id: Number) {
    this.isEditItems = !this.isEditItems;
  }

}
