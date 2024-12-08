import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    if (this.isEditMode) {
      this.userService.getUserById(Number(id)).subscribe((user: User) => {
        this.userForm.patchValue(user);
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.router.navigate(['/users']);
      console.log('Form Submitted', this.userForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
