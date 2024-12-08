import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getUserById(id).subscribe(
        user => (this.user = user),
        error => {
          console.error('Error fetching user:', error);
          this.router.navigate(['/users']); 
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
