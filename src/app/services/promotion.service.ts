import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions(): Promise<Promotion[]> {
    return new Promise( resolve => {
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });  
  }

  //return the 1st promotion dish given the pass-in id
  getPromotion(id: string): Promise<Promotion>{
    return new Promise( resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    });  
  }

  //return the 1st promotion dish which featured = true
  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise (resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
  }
}
