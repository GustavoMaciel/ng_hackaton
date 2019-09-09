import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicSearchComponent } from './basic-search/basic-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BasicSearchComponent],
  exports: [BasicSearchComponent]
})
export class SharedComponentsModule { }
