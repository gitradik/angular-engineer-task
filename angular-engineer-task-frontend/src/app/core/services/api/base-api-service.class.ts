import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from 'environments/environment';

export interface Response<T> {
  data: T;
}

export class BaseAPIService {
  private baseApiUrl = environment.apiUrl;
  errorMessage = 'Some Error occcured';

  constructor(public http: HttpClient) {}

  get<T>(url: string, params: any = {}): Observable<Response<T>> {
    const options = { params: new HttpParams({ fromObject: params }) };
    const response = this.http.get<Response<T>>(
      `${this.baseApiUrl}/${url}`,
      options
    );

    return new Observable((observer: Observer<Response<T>>) =>
      response.subscribe({
        next: (v) => observer.next(v),
        error: (e) => observer.error(e),
        complete: () => observer.complete(),
      })
    );
  }

  post<T>(url: string, payload: Partial<T>): Observable<Response<T>> {
    const response = this.http.post<Response<T>>(
      `${this.baseApiUrl}/${url}`,
      payload
    );

    return new Observable((observer: Observer<Response<T>>) =>
      response.subscribe({
        next: (v) => observer.next(v),
        error: (e) => observer.error(e),
        complete: () => observer.complete(),
      })
    );
  }

  delete(url: string, id: string): Observable<Response<string>> {
    const response = this.http.delete<Response<string>>(
      `${this.baseApiUrl}/${url}/${id}`
    );

    return new Observable((observer: Observer<Response<string>>) =>
      response.subscribe({
        next: (v) => observer.next(v),
        error: (e) => observer.error(e),
        complete: () => observer.complete(),
      })
    );
  }
}
