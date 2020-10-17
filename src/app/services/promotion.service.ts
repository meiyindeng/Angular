import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  //return the 1st promotion dish given the pass-in id
  getPromotion(id: string): Promotion{
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }

  //return the 1st promotion dish which featured = true
  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promo) => promo.featured)[0];

  }
}
