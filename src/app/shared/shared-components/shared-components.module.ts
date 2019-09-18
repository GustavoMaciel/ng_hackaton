import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicSearchComponent } from './basic-search/basic-search.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BasicSearchComponent, DeleteComponent],
  exports: [BasicSearchComponent, DeleteComponent]
})
export class SharedComponentsModule { }
