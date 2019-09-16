import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import {isCPF} from 'brazilian-values';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../pessoa';
import { BaseComponent } from 'src/app/shared/shared-components/base.component';
import { ActivatedRoute } from '@angular/router';
import { Telefone } from '../../telefone';
import { BaseEditComponent } from 'src/app/shared/shared-components/base-edit.component';

@Component({
  selector: 'app-pessoa-edit',
  templateUrl: './pessoa-edit.component.html',
  styleUrls: ['./pessoa-edit.component.scss']
})
export class PessoaEditComponent extends BaseEditComponent {

  /**Pessoa FormGroup
   * @type {FormGroup}
   */
  formGroup: FormGroup;
  /**Telefone FormGroup
   * @type {FormGroup}
   */
  phoneForm: FormGroup

  deletedPhones: Telefone[] = []
 

  /**
   * Constructor with injectables
   * 
   * @param formBuilder 
   * @param service 
   * @param route 
   */
  constructor(formBuilder: FormBuilder, servicePessoa: PessoaService, route: ActivatedRoute) { 
    super(formBuilder, route, servicePessoa); 
  }

  /**
   * Calls super class' ngOnInit
   */
  ngOnInit() {
    super.ngOnInit();
  }

  /**
   * Populate the FormArray with the existent phones
   */
  populatePhoneFormArray(): void{
    for(let phone of this.pessoa.telefones){
      this.phoneForms.push(this.formBuilder.group({
        countryCode: [phone.countryCode, Validators.required],
        ddd: [phone.ddd, Validators.required],
        number: [phone.number, Validators.required]
      }));
    } 
  }

  /**
   * Return a new Object to be used in the formBuilder
   * If it's editing will build the object using the pessoa variable fields
   */
  generateForm(): void {
    if(this.isEditing){
      this.formGroup = this.formBuilder.group(
        {
          nome: [this.pessoa.nome, Validators.required],
          sobrenome: [this.pessoa.sobrenome, Validators.required],
          email: [this.pessoa.email, [Validators.required, Validators.email]],
          cpf: [this.pessoa.cpf, [Validators.required]],
          phones: new FormArray([])
        },
        {validator: this.CPFValidator('cpf')}
      );
      this.populatePhoneFormArray();
    } else {
      this.formGroup = this.formBuilder.group(
        {
          nome: ['', Validators.required],
          sobrenome: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          cpf: ['', [Validators.required]],
          phones: new FormArray([])
        },
        {validator: this.CPFValidator('cpf')}
      );
    }
  }

  /**
   * Convenience getters to access the form fields
   */
  get form () {return this.formGroup.controls}
  get phoneForms () {return this.form.phones as FormArray}
  get pessoa() { return this.item }

  /**
   * Convenience setters
   */
  set pessoa(pessoa: Pessoa) { this.item = pessoa }

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
   * Saves all the phones of the informed Pessoa
   * 
   * @param {Pessoa} person 
   */
  saveNewPhones(person: Pessoa): void{
    person.telefones = []
    for(let phone of this.phoneForms.controls){
      console.log(phone.value.countryCode);
      person.telefones.push(
        new Telefone(this.pessoa.id,
          phone.value.countryCode, 
          phone.value.ddd, 
          phone.value.number)
        )
    }
  }

  /**
   * Method to deal with form submission
   */
  onSubmit() {
    this.submitted = true;
    
    if(this.formGroup.invalid){
      return;
    }

    if(this.isEditing){
      this.saveNewPhones(this.pessoa);
      this.service.update(this.pessoa).subscribe((res) => {
        this.navigate(['pessoa', 'view', this.pessoa.id]);
      });
    } else {
      this.pessoa = new Pessoa(
        0, this.form.nome.value, this.form.sobrenome.value, this.form.email.value, this.form.cpf.value
        );

      this.saveNewPhones(this.pessoa);
      this.service.create(this.pessoa).subscribe((result) => {
        this.navigate(['pessoa']);
      });
    }
  }

  /**
   * Adds a new phone card in the phone array
   */
  onAddPhoneClick(){
    this.phoneForms.push(this.formBuilder.group(
      {
        countryCode: ['', Validators.required],
        ddd: ['', Validators.required],
        number: ['', Validators.required]
      }
    ));

    return false;
  }

  /**
   * Deletes the phone card with the informed index
   * 
   * @param {number} index 
   */
  deletePhoneCard(index:number){
    const deletedPhone: any = this.phoneForms.at(index).value;
    for(let phone of this.pessoa.telefones){
      if(deletedPhone.countryCode === phone.countryCode 
        && deletedPhone.ddd === phone.ddd && deletedPhone.number === phone.number){
          this.deletedPhones.push(phone);
          break;
        }
    }
    this.phoneForms.removeAt(index);
    return false;
  }

  /**
   * Method to deal with form reset
   */
  onReset() {
    if(this.isEditing){
      return;
    }
    this.submitted = false;
    this.formGroup.reset();
    while (this.phoneForms.length !== 0){
      this.phoneForms.removeAt(0);
    }
  }



  /**
   * If the variable pessoa is not null, then it's edit mode, it'll be create mode otherwise
   */
  getRouterURL(): string{
    return this.pessoa ? "edit" : "create";
  }

}
