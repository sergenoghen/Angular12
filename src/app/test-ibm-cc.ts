// Angular 12.x code
import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector:'label-component',
  template: `<div>Hello World!</div>`
})
export class LabelComponent {
}

// #region Preview
@Component({
    selector:'preview-component',
    template: `<label-component ngClass=[myClass] label='Hello World!' color='red'></label-component>`
})
export class PreviewComponent {
  myClass = 'label';
  myColor = 'red';
 }
// #endregion Preview

// #region Module declaration - Do not Change
@NgModule({
    imports: [CommonModule],
    declarations: [PreviewComponent, LabelComponent],
    entryComponents: [PreviewComponent]
})
export class PreviewModule { }
// #endregion Module declaration