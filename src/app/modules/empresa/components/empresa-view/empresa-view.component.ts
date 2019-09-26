import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { BaseViewComponent } from 'src/app/shared/shared-components/base.view.component';

@Component({
  selector: 'app-empresa-view',
  templateUrl: './empresa-view.component.html',
  styleUrls: ['./empresa-view.component.scss']
})
export class EmpresaViewComponent extends BaseViewComponent {

  constructor(private route: ActivatedRoute, service: EmpresaService) { 
    super(service); 
  }

  get company() {
    return this.item;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getId(){
    return +this.route.snapshot.paramMap.get("id");
  }

  protected getRouterURL(): string {
    return 'empresa'
  }

}
