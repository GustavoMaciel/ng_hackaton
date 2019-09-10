import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {isCPF} from 'brazilian-values';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../pessoa';
import { BaseComponent } from 'src/app/shared/shared-components/base.component';

@Component({
  selector: 'app-pessoa-edit',
  templateUrl: './pessoa-edit.component.html',
  styleUrls: ['./pessoa-edit.component.scss']
})
export class PessoaEditComponent extends BaseComponent {
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private service: PessoaService) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.registerForm = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]]
    },{
      validator: this.CPFValidator('cpf')
    });
  }

  get form () {return this.registerForm.controls}

  CPFValidator(controlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if(control.errors && !control.errors.cpfValidator){
        return;
      }
      if(!isCPF(control.value)){
        control.setErrors({cpfValidator: true});
      } else {
        control.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.submitted = true;
    
    if(this.registerForm.invalid){
      return;
    }
    const p: Pessoa = new Pessoa(
      0, this.form.nome.value, this.form.sobrenome.value, this.form.email.value, this.form.cpf.value
      );
    this.service.create(p).subscribe((result) => {
      this.navigate(['pessoa']);
    });
  }

  getRouterURL(): string{
    return 'create';
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
