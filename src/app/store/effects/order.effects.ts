/** Ce module appel la fonction qui lance la requete de l'API 
 * https://v8.ngrx.io/guide/store
 * //https://v10.ngrx.io/guide/store/install
*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customers/customer.service';

import { CustomerActions } from '..';
import { OrderActions } from '..';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private router: Router
  ) {}

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getCustomerOrders),
      mergeMap((action) => {
        return this.customerService.getOrders(action.id).pipe(//fonction de la requete de l'API
          map((order) => {
            //console.log(order);
            return OrderActions.getCustomerOrdersSuccess({
              order,
            });
          }),
          catchError((res) => {
            console.log(res);
            
            this.router.navigate(['/']);
            return EMPTY;
          })
        );
      })
    )
  );
}
