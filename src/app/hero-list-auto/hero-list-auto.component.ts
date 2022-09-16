import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../models/hero';

@Component({
  selector: 'app-hero-list-auto',
  templateUrl: './hero-list-auto.component.html',
  styleUrls: ['./hero-list-auto.component.scss']
})
export class HeroListAutoComponent implements OnInit {

  
  @Output() remove = new EventEmitter<number>();
  @Input() heroes: Hero[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  
  removeHero(id: number) {
    this.remove.emit(id);
  }
}
