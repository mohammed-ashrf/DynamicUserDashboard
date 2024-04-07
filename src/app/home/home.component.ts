import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  users: User[] = [];
  pageNumber: number = 1;
  pages!: number;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.pageNumber).subscribe(page => {
      this.users = page.data;
      this.pages = page.total_pages;
    });
  }

  nextPage(): void {
    if (this.pageNumber < this.pages) {
      this.pageNumber++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadUsers();
    }
  }
}
