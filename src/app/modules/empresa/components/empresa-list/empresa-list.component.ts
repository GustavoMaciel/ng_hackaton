import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/shared-components/base-list.component';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent extends BaseListComponent {

  constructor(private service: EmpresaService) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.getAll(this.service);
  }


  protected getRouterURL(): string {
    return 'empresa';
  }

  get companies() {
    return this.getAll(this.service);
  }

}
