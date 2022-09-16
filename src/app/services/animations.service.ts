import { Inject, Injectable } from '@angular/core';
import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state, keyframes
} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  constructor(
    // @Inject(TransitionAnimation) private transitionAnimation : typeof TransitionAnimation ,
    // @Inject(SlideInAnimation) private slideInAnimation : typeof SlideInAnimation ,
    // @Inject(AnimateMe) private animateMe : typeof AnimateMe ,
    // @Inject(QueryAnimation) private queryAnimation : typeof QueryAnimation ,
    // @Inject(OpenCloseAnimation) private openCloseAnimation : typeof OpenCloseAnimation ,
    // @Inject(SlideStatus) private slideStatus : typeof SlideStatus ,
    // @Inject(InsertRemoveAnimation) private insertRemoveAnimation : typeof InsertRemoveAnimation ,
  ) { }
    public shrinkOutAnimation = ShrinkOutAnimation;
}


export const TransitionAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]);

// Routable animations
export const SlideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ]),
      ]),
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ]),
        query('@*', animateChild())
      ]),
    ])
  ]);

export const OpenCloseAnimation = 
  trigger('openClose', [
    // ...
    state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      height: '100px',
      opacity: 0.8,
      backgroundColor: 'blue'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
    transition('* => closed', [
      animate('1s')
    ]),
    transition('* => open', [
      animate('0.5s')
    ]),
    transition('open <=> closed', [
      animate('0.5s')
    ]),
    transition ('* => open', [
      animate ('1s',
        style ({ opacity: '*' }),
      ),
    ]),
    transition('* => *', [
      animate('1s')
    ]),
  ]);

export const QueryAnimation = 
  trigger('query', [
    transition(':enter', [
      style({ height: 0 }),
      group([
        animate(500, style({ height: '*' })),
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0)'}),
          animate(2000, style({ opacity: 1, transform: 'scale(1)' }))
        ]),
        query('.hero', [
          style({ transform: 'translateX(-100%)'}),
          animate('.7s 500ms ease-in', style({ transform: 'translateX(0)' }))
        ]),
      ]),
      query('@animateMe', animateChild()),
    ]),
    transition(':leave', [
      style({ height: '*' }),
      query('@animateMe', animateChild()),
      group([
        animate('500ms 500ms', style({ height: '0', padding: '0' })),
        query(':leave', [
          style({ opacity: 1, transform: 'scale(1)'}),
          animate('1s', style({ opacity: 0, transform: 'scale(0)' }))
        ]),
        query('.hero', [
          style({ transform: 'translateX(0)'}),
          animate('.7s ease-out', style({ transform: 'translateX(-100%)' }))
        ]),
      ]),
    ]),
  ]);

export const AnimateMe = 
  trigger('animateMe', [
    transition('* <=> *', animate('500ms cubic-bezier(.68,-0.73,.26,1.65)', keyframes([
      style({ backgroundColor: "transparent", color: '*', offset: 0 }),
      style({ backgroundColor: "blue", color: 'white', offset: 0.2 }),
      style({ backgroundColor: "transparent", color: '*', offset: 1 })
    ])))
  ]);

export const SlideStatus = 
  trigger('slideStatus', [
    state('inactive', style({ backgroundColor: 'blue' })),
    state('active', style({ backgroundColor: '#754600' })),

    transition('* => active', [
      animate('2s', keyframes([
        style({ backgroundColor: 'blue', offset: 0}),
        style({ backgroundColor: 'red', offset: 0.8}),
        style({ backgroundColor: '#754600', offset: 1.0})
      ])),
    ]),
    transition('* => inactive', [
      animate('2s', keyframes([
        style({ backgroundColor: '#754600', offset: 0}),
        style({ backgroundColor: 'red', offset: 0.2}),
        style({ backgroundColor: 'blue', offset: 1.0})
      ]))
    ]),

    transition('* => active', [
      animate('2s', keyframes([
        style({ backgroundColor: 'blue' }),
        style({ backgroundColor: 'red' }),
        style({ backgroundColor: 'orange' })
      ]))
    ]),
  ]);

export const InsertRemoveAnimation = 
  trigger('insertRemove', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('100ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('100ms', style({ opacity: 0 }))
    ])
  ]);

export const ShrinkOutAnimation = 
  trigger('shrinkOut', [
    state('in', style({ height: '*' })),
    transition('* => void', [
      style({ height: '*' }),
      animate(250, style({ height: 0 }))
    ])
  ]);