import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/users', id]);
  }

  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      const deletedUser = this.users.find(user => user.id === id)?.name || 'User';
      this.users = this.users.filter(user => user.id !== id);
  
      this.snackBar.open(`${deletedUser} has been deleted.`, 'Close', {
        duration: 3000, 
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
  createUser(){
    this.router.navigate(['/users/new']);
  }

}
