import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';
import { filter } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DetailsComponent implements OnInit {
  user!: User;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userServcie: UserService,
  ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    if (userId) {
      this.loadUser(userId);
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const id = +this.route.snapshot.paramMap.get('id')!;
      if (id) {
        this.loadUser(id);
      }
    });
  }

  loadUser(id: number): void {
    this.loading = true;
    this.userServcie.getUserById(id).subscribe(user => {
      this.user = user.data;
      this.loading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
