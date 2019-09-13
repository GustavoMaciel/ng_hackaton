import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../empresa';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { BaseComponent } from 'src/app/shared/shared-components/base.component';

@Component({
  selector: 'app-empresa-view',
  templateUrl: './empresa-view.component.html',
  styleUrls: ['./empresa-view.component.scss']
})
export class EmpresaViewComponent extends BaseComponent {

  company: Empresa;

  constructor(private route: ActivatedRoute, private service: EmpresaService) { super(); }

  ngOnInit() {
    super.ngOnInit();
    const id: number = +this.route.snapshot.paramMap.get("id");
    this.setCompany(id);
  }

  /**
   * Set the company variable to a Empresa object with the informed ID
   * 
   * @param {number} id 
   */
  setCompany(id: number): void{
    this.service.getById(id).subscribe((result) => {
      this.company = result;
    });
  }

}
