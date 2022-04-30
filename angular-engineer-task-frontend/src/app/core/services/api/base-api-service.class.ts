import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from 'environments/environment';

export class SingleResponse {
  public status: number | undefined;
  public IsSuccess: boolean | undefined;
  public details: string | undefined;
}

export class Responses {
  public errors: SingleResponse[] = [];
  public success: SingleResponse[] = [];
}

export class BaseAPIService {
  baseApiUrl = environment.apiUrl;

  errorMessage = "Some Error occcured, Please contact Administrator for the Errors";

  constructor(public http: HttpClient) {}

  get<T>(url: string, params: any = {}): Observable<T> {
    const options = { params: new HttpParams({ fromObject: params }) };
    const response = this.http
      .get<Responses & T>(`${this.baseApiUrl}/${url}`, options);

    return new Observable((observer: Observer<T>) => response.subscribe({
      next: (v) => observer.next(v),
      error: (e) => observer.error(e),
      complete: () => observer.complete(), 
    }));
  }


  // post(url: string, body: object): Observable<Responses[]> {
  //   let response = this.http
  //     .post<Responses>(url, body);

  //   return Observable.create((observer: Observer) => {
  //     response.subscribe(res => {
  //       if (res.errors.length > 0)
  //         observer.error(res.errors);
  //       else
  //         observer.next(res.success);
  //       observer.complete();
  //     }, error => {
  //       observer.error([{ title: error.name, detail: this.errorMessage, error }]);
  //     });
  //   });
  // }

  // delete(url: string): Observable<Responses[]> {
  //   let response = this.http
  //     .delete<Responses>(url);

  //   return Observable.create((observer: Observer) => {
  //     response.subscribe(res => {
  //       if (res.errors.length > 0)
  //         observer.error(res.errors);
  //       else
  //         observer.next(res.success);
  //       observer.complete();
  //     }, error => {
  //       observer.error([{ title: error.name, detail: this.errorMessage, error }]);
  //     });
  //   });
  // }
}
