import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';
  searchResult: User[] = [];
  isSearched: boolean = false;
  constructor(private router: Router,
    private userService: UserService) { }

  onSearch(): void {
    if (this.searchQuery.trim() !== '') {
      this.userService.getUserById(Number(this.searchQuery.trim())).subscribe(
        (user) => {
          this.searchResult.push(user.data);
          this.isSearched = true;
        }
      )
    }
  }

  onSelect(user: User): void {
    this.router.navigate(['/user', user.id]);
    this.searchQuery = "";
    this.isSearched = false;
    this.searchResult = [];
  }
}
