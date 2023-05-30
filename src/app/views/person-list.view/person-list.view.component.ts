import { Component, ViewChild, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { CrudDialogComponent } from 'src/app/components/crud-dialog/crud-dialog.component';

@Component({
  selector: 'app-person-list.view',
  templateUrl: './person-list.view.component.html',
  styleUrls: ['./person-list.view.component.css']
})
export class PersonListViewComponent {

  username!:string;
  email!:string;
  password!:string;

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'username', 'email', 'password','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private usersService:UserService,
    public dialog: MatDialog
  ) {}

  openDialog(person: User | null): void {
    const dialogRef = this.dialog.open(CrudDialogComponent, {
      data: person != null ? person : undefined,
    });


    dialogRef.componentInstance.done.subscribe((res: any) => {

      console.log('Event received:', res);

      this.getAllPersons();
      dialogRef.close();
    });


    dialogRef.componentInstance.close.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getAllPersons() {
    this.usersService.getAllPersons().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  ngOnInit() {
    this.getAllPersons();
  }

  deletePerson(id: number) {
    this.usersService.deletePerson(id).subscribe((res: any) => {
      this.getAllPersons();
    });
  }
}
