import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonAppService {
  private apiUrl = `${environment.apiUrl}api/deadline`;
  constructor(private http: HttpClient) {
  }
  getSecondsLeft(): Observable<{ secondsLeft: number }> {
    return this.http.get<{ secondsLeft: number }>(this.apiUrl);
  }
}
