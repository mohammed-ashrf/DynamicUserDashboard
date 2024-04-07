import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnDestroy{

  isLoading: boolean = false;
  private subscription!: Subscription;

  constructor (private loaderService: LoaderService) {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: boolean) => {
      this.isLoading = state;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
