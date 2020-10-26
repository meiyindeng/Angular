import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  //return promise from an observable
  getDishes():  Observable<Dish[]>{
    return of(DISHES).pipe(delay(2000));
    
  }

  //return the 1st dish given the pass-in id
  getDish(id: string): Observable<Dish>{
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    
  }

  //return the 1st dish which featured = true
  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    
  }  

  //the map produce a new array, calling a function of return dish.id on every dish of DISHES
  getDishIds(): Observable<string[] | any>{
    return of(DISHES.map(dish => dish.id));
  }
}
