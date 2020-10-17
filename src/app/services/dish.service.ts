import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHES;
  }

  //return the 1st dish given the pass-in id
  getDish(id: string): Dish{
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  //return the 1st dish which featured = true
  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];

  }
}
