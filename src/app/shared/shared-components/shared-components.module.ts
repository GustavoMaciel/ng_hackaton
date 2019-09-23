import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicSearchComponent } from './basic-search/basic-search.component';
import { DeleteComponent } from './delete/delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { AmountPerPageComponent } from './amount-per-page/amount-per-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BasicSearchComponent, DeleteComponent, PaginationComponent, AmountPerPageComponent],
  exports: [BasicSearchComponent, DeleteComponent, PaginationComponent, AmountPerPageComponent]
})
export class SharedComponentsModule { }
