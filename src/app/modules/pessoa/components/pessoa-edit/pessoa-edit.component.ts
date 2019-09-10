import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {isCPF} from 'brazilian-values';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../pessoa';
import { BaseComponent } from 'src/app/shared/shared-components/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoa-edit',
  templateUrl: './pessoa-edit.component.html',
  styleUrls: ['./pessoa-edit.component.scss']
})
export class PessoaEditComponent extends BaseComponent {

  /**
   * @type {FormGroup}
   */
  registerForm: FormGroup;
  /**
   * If the form was already submitted
   * @type {boolean}
   */
  submitted: boolean = false;
  /**
   * if it is edit or create
   * @type {boolean}
   */
  isEditing: boolean = false;
  /**
   * The Pessoa object is null if it's on create mode
   * @type {Pessoa}
   */
  pessoa: Pessoa = null;

  /**
   * Constructor with injectables
   * 
   * @param formBuilder 
   * @param service 
   * @param route 
   */
  constructor(private formBuilder: FormBuilder, private service: PessoaService, private route: ActivatedRoute) { super(); }

  /**
   * Get id if there's one
   * If there's an id will set the pessoa variable to a Pessoa object
   * Will then generate a new FormGroup
   */
  ngOnInit() {
    super.ngOnInit();
    const id: number = +this.route.snapshot.paramMap.get("id");

    if(id){
      this.isEditing = true;
      this.setPessoa(id);
    }

    this.registerForm = this.formBuilder.group(
      this.generateForm() ,{
      validator: this.CPFValidator('cpf')
    });
  }

  /**
   * Set the pessoa var into a Pessoa object with the informed id
   * 
   * @param {number} id 
   */
  setPessoa(id: number): void{
    this.service.getById(id).subscribe((result) => {
      this.pessoa = result;
    });
  }

  /**
   * Return a new Object to be used in the formBuilder
   * If it's editing will build the object using the pessoa variable fields
   */
  generateForm(): Object {
    if(!this.isEditing){
      return {
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required]]
      };
    }
    return {
      nome: [this.pessoa.nome, Validators.required],
      sobrenome: [this.pessoa.sobrenome, Validators.required],
      email: [this.pessoa.email, [Validators.required, Validators.email]],
      cpf: [this.pessoa.cpf, [Validators.required]]
    };
  }

  /**
   * To easier access the form fields
   */
  get form () {return this.registerForm.controls}

  /**
   * Generates a new validator for the FormGroup to validate if the informed CPF is valid
   * 
   * @param {string} controlName 
   */
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

  /**
   * Method to deal with form submission
   */
  onSubmit() {
    this.submitted = true;
    
    if(this.registerForm.invalid){
      return;
    }
    if(this.isEditing){

    } else {
      this.pessoa = new Pessoa(
        0, this.form.nome.value, this.form.sobrenome.value, this.form.email.value, this.form.cpf.value
        );
      this.service.create(this.pessoa).subscribe((result) => {
      this.navigate(['pessoa']);
      });
    }
  }

  /**
   * If the variable pessoa is not null, then it's edit mode, it'll be create mode otherwise
   */
  getRouterURL(): string{
    return this.pessoa ? "edit" : "create";
  }

  /**
   * Method to deal with form reset
   */
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
