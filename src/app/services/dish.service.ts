import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, 
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  //return promise from an observable
  getDishes():  Observable<Dish[]>{
    return this.http.get<Dish[]>(BaseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  //return the 1st dish given the pass-in id
  getDish(id: string): Observable<Dish>{
    return this.http.get<Dish>(BaseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  //return the 1st dish which featured = true
  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(BaseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }  

  //the map produce a new array, calling a function of return dish.id on every dish of DISHES
  getDishIds(): Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
    
  }


}
