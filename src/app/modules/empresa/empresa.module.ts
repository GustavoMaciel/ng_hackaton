import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';
import { EmpresaEditComponent } from './components/empresa-edit/empresa-edit.component';
import { EmpresaViewComponent } from './components/empresa-view/empresa-view.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaService } from './services/empresa.service';
import { EmpresaMockService } from './services/empresa.mock.service';

@NgModule({
  declarations: [EmpresaListComponent, EmpresaEditComponent, EmpresaViewComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule
  ],
  providers: [
    {provide: EmpresaService, useClass: EmpresaMockService}
  ]
})
export class EmpresaModule { }
