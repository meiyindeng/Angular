import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    //to identify if the error is come from the server side or from other reason

    //error from code
    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    }

    //error from server
    else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    //return an error observable
    return throwError(errMsg);
  }
}
