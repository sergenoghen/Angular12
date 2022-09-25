import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerModule } from './modules/customer/customer.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import * as Bootstrap from 'node_modules/ngx-bootstrap';
import { AppComponent } from './app.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { environment } from 'src/environments/environment';
import { customerDetailsReducer, customerOrderReducer } from './store/reducers/customer.reducer';
import { CustomerEffects } from './store/effects/customer.effects';
import { OrderEffects } from './store/effects/order.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; 
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';


export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [logger]
  : [];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CustomerModule,
    StoreModule.forRoot(
      {
        customerDetails : customerDetailsReducer,
        customerOrders : customerOrderReducer
      }, 
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: false,
          strictActionSerializability: false,
        },
      }
    ),
    EffectsModule.forRoot([
      CustomerEffects,
      OrderEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,//environment.production, 
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],//to allow non html tags
})
export class AppModule { }
