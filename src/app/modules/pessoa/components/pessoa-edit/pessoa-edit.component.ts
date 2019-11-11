import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { isCPF, formatToCPF } from 'brazilian-values';
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
    constructor(formBuilder: FormBuilder, service: PessoaService, route: ActivatedRoute) {
        super(formBuilder, route, service);
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
    populatePhoneFormArray(): void {
        for (let phone of this.person.telefones) {
            this.phoneForms.push(this.formBuilder.group({
                id: [phone.id],
                countryCode: [phone.codigoPais, Validators.required],
                ddd: [phone.ddd, Validators.required],
                number: [phone.numero, Validators.required]
            }));
        }
    }

    /**
     * Return a new Object to be used in the formBuilder
     * If it's editing will build the object using the person variable fields
     */
    generateForm(): void {
        if (this.isEditing) {
            this.formGroup = this.formBuilder.group(
                {
                    nome: [this.person.nome, Validators.required],
                    sobrenome: [this.person.sobrenome, Validators.required],
                    email: [this.person.email, [Validators.required, Validators.email]],
                    cpf: [this.person.cpf, [Validators.required]],
                    phones: new FormArray([])
                },
                { validator: this.CPFValidator('cpf') }
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
                { validator: this.CPFValidator('cpf') }
            );
        }
    }

    /**
     * Convenience getters to access the form fields
     */
    get form() { return this.formGroup.controls }
    get phoneForms() { return this.form.phones as FormArray }
    get person() { return this.item }

    /**
     * Convenience setters
     */
    set person(person: any) { this.item = person }

    /**
     * Generates a new validator for the FormGroup to validate if the informed CPF is valid
     * 
     * @param {string} controlName 
     */
    CPFValidator(controlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            if (control.errors && !control.errors.cpfValidator) {
                return;
            }
            if (!isCPF(control.value)) {
                control.setErrors({ cpfValidator: true });
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
    saveNewPhones(person: Pessoa): void {
        person.telefones = []
        for (let phone of this.phoneForms.controls) {
            let telefone = new Telefone(this.person.id,
                phone.value.countryCode,
                phone.value.ddd,
                phone.value.number);
            telefone.id = phone.value.id;
            person.telefones.push(telefone);
        }
    }

    updatePerson() {
        this.person.nome = this.form.nome.value;
        this.person.sobrenome = this.form.sobrenome.value;
        this.person.cpf = formatToCPF(this.form.cpf.value);
        this.person.email = this.form.email.value;

        this.service.update(this.person).subscribe((res) => {
            this.navigate(['pessoa', 'view', this.person.id]);
        }, err => {
            console.log(err);
        });
    }

    /**
     * Method to deal with form submission
     */
    onSubmit() {
        this.submitted = true;

        if (this.formGroup.invalid) {
            return;
        }

        if (!this.isEditing) {
            this.person = new Pessoa(
                0, this.form.nome.value, this.form.sobrenome.value, this.form.email.value, formatToCPF(this.form.cpf.value)
            );
        }

        this.saveNewPhones(this.person);

        if (this.isEditing) {
            this.updatePerson();
        } else {
            this.service.create(this.person).subscribe((result) => {
                this.navigate(['pessoa']);
            });
        }
    }

    /**
     * Adds a new phone card in the phone array
     */
    onAddPhoneClick() {
        this.phoneForms.push(this.formBuilder.group(
            {
                id: [undefined],
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
    deletePhoneCard(index: number) {
        const deletedPhone: any = this.phoneForms.at(index).value;
        for (let phone of this.person.telefones) {
            if (deletedPhone.countryCode === phone.countryCode
                && deletedPhone.ddd === phone.ddd && deletedPhone.number === phone.number) {
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
        if (this.isEditing) {
            return;
        }
        this.submitted = false;
        this.formGroup.reset();
        while (this.phoneForms.length !== 0) {
            this.phoneForms.removeAt(0);
        }
    }



    /**
     * If the variable person is not null, then it's edit mode, it'll be create mode otherwise
     */
    getRouterURL(): string {
        return this.person ? "edit" : "create";
    }

}
