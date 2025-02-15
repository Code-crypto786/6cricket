import { Component } from '@angular/core';
import { CommonAppService } from '../Shared/Services/common-app.service';
import { catchError, interval, of, Subject, switchMap, takeUntil } from 'rxjs';
import { CountdownTimerComponent } from "../Shared/Components/countdown-timer/countdown-timer.component";

@Component({
  selector: 'app-seconds-left',
  standalone: true,
  imports: [CountdownTimerComponent],
  templateUrl: './seconds-left.component.html',
  styleUrl: './seconds-left.component.scss'
})
export class SecondsLeftComponent {
  secondsLeft: number = 0;
  private destroy$ = new Subject<void>();

  constructor(private commonAppService: CommonAppService) {}

  ngOnInit() {
    this.commonAppService.getSecondsLeft().pipe(
      catchError(() => {
        console.error('API Error: Setting default value (100)');
        return of({ secondsLeft: 100 });
      }),
      switchMap(initialSeconds => {
        this.secondsLeft = initialSeconds.secondsLeft;
        return interval(1000);
      }),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
      }
    });

    interval(30000).pipe(
      switchMap(() => this.commonAppService.getSecondsLeft()),
      takeUntil(this.destroy$)
    ).subscribe(seconds => this.secondsLeft = seconds.secondsLeft);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
