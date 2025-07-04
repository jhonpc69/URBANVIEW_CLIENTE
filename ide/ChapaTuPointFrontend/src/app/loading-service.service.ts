import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private minimumDuration = 400; 
  private loadingStartTime: number | null = null;

  show() {
    this.loadingStartTime = Date.now();
    this.loadingSubject.next(true);
  }

  hide() {
    if (this.loadingStartTime) {
      const elapsedTime = Date.now() - this.loadingStartTime;
      const remainingTime = this.minimumDuration - elapsedTime;

      if (remainingTime > 0) {
        setTimeout(() => {
          this.loadingSubject.next(false);
          this.loadingStartTime = null;
        }, remainingTime);
      } else {
        this.loadingSubject.next(false);
        this.loadingStartTime = null;
      }
    } else {
      this.loadingSubject.next(false);
    }
  }
}