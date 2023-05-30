import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-crud-dialog',
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.css']
})
export class CrudDialogComponent {
  @Output() done = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  // Inputs
  username!: "" | string;
  email!: "" | string;
  password!: "" | string;

  // InputForPerson if Person is not defined.
  id!: number;

  constructor(private UserService: UserService, public dialogRef: MatDialogRef<CrudDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
  ) {
    if (user != undefined) {
      console.log(user);
      this.id = user.userId;
      this.username = user.username;
      this.email = user.email;
      this.password = user.password;
      console.log(user.username);
    }
  }

  confirm() {
    if (this.user == undefined) {
      this.UserService.postPerson({ username: this.username, email: this.email, password: this.password }).subscribe((res: any) => {
        console.log("POST!");
        this.id = 0;
        this.username = "";
        this.email = "";
        this.password = "";
        this.done.emit(res);
      })
    } else {
      console.log(this.user);
      this.UserService.putPerson(this.id, new User(this.id, this.username, this.email, this.password)).subscribe((res: any) => {
        this.done.emit(res);
      });
    }
  }

  cancel() {
    this.close.emit();
  }
}
