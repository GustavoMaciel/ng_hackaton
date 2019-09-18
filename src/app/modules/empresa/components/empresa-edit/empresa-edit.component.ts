import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/shared-components/base-edit.component';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { Endereco, ESTADOS } from '../../endereco';
import { Empresa } from '../../empresa';
import { isCNPJ, formatToCNPJ } from 'brazilian-values';

@Component({
    selector: 'app-empresa-edit',
    templateUrl: './empresa-edit.component.html',
    styleUrls: ['./empresa-edit.component.scss']
})
export class EmpresaEditComponent extends BaseEditComponent {

    /**Empresa FormGroup
     * @type {FormGroup}
     */
    formGroup: FormGroup;
    /**Endereco FormGroup
     * @type {FormGroup}
     */
    addressForm: FormGroup

    deletedAddresses: Endereco[] = []

    constructor(formBuilder: FormBuilder, serviceEmpresa: EmpresaService, route: ActivatedRoute) {
        super(formBuilder, route, serviceEmpresa);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    /**
     * Convenience getters to access the form fields
     */
    get form() { return this.formGroup.controls }
    get addressForms() { return this.form.addresses as FormArray }
    get company() { return this.item }
    get states() { return ESTADOS }

    /**
     * Convenience setters
     */
    set company(company: Empresa) { this.item = company }

    generateForm(): void {
        if (this.isEditing) {
            this.formGroup = this.formBuilder.group(
                {
                    fancyName: [this.company.fancyName, Validators.required],
                    mission: [this.company.mission, Validators.required],
                    vision: [this.company.vision, [Validators.required]],
                    cnpj: [this.company.cnpj, [Validators.required]],
                    addresses: new FormArray([])
                },
                { validator: this.CNPJValidator('cnpj') }
            );
            this.populateAddressFormArray();
        } else {
            this.formGroup = this.formBuilder.group(
                {
                    fancyName: ['', Validators.required],
                    mission: ['', Validators.required],
                    vision: ['', [Validators.required]],
                    cnpj: ['', [Validators.required]],
                    addresses: new FormArray([])
                },
                { validator: this.CNPJValidator('cnpj') }
            );
        }
    }
    
    /**
     * Method to populate the FormArray with existent addresses
     */
    populateAddressFormArray() {
        for (let address of this.company.enderecos) {
            this.addressForms.push(this.formBuilder.group({
                state: [address.state, Validators.required],
                city: [address.city, Validators.required],
                street: [address.street, Validators.required],
                number: [address.number, Validators.required],
                neighborhood: [address.neighborhood, Validators.required]
            }));
        }
    }

    /**
     * Generates a new validator for the FormGroup to validate if the informed CNPJ is valid
     * 
     * @param {string} controlName 
     */
    CNPJValidator(controlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            if (control.errors && !control.errors.cnpjValidator) {
                return;
            }
            if (!isCNPJ(control.value)) {
                control.setErrors({ cnpjValidator: true });
            } else {
                control.setErrors(null);
            }
        };
    }

    /**
     * Save all new addresses in the informed company
     * 
     * @param {Empresa} company 
     */
    saveNewAddresses(company: Empresa): void {
        company.enderecos = []
        for (let address of this.addressForms.controls) {
            company.enderecos.push(
                new Endereco(company.id,
                    address.value.city,
                    address.value.state,
                    address.value.street,
                    address.value.number,
                    address.value.neighborhood)
            );
        }
    }

    /**
     * Updates company with form values
     */
    updateCompany() {
        this.company.fancyName = this.form.fancyName.value;
        this.company.cnpj = formatToCNPJ(this.form.cnpj.value);
        this.company.mission = this.form.mission.value;
        this.company.vision = this.form.vision.value;
        
        this.service.update(this.company).subscribe(result => {
            this.navigate(['empresa', 'view', this.company.id]);
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
            this.company = new Empresa(
                formatToCNPJ(this.form.cnpj.value), this.form.fancyName.value, this.form.mission.value, this.form.vision.value
            );
        }
        this.saveNewAddresses(this.company);

        if (this.isEditing) {
            this.updateCompany();
        } else {
            this.service.create(this.company).subscribe(result => {
                this.navigate(['empresa']);
            }, err => {
                console.log(err);
            });
        }
    }

    /**
     * Adds a new address card in the adress array
     */
    onAddAddressClick() {
        this.addressForms.push(this.formBuilder.group(
            {
                state: ['', Validators.required],
                city: ['', Validators.required],
                street: ['', Validators.required],
                number: ['', Validators.required],
                neighborhood: ['', Validators.required]
            }
        ));

        return false;
    }

    /**
     * Deletes the Address card with the informed index
     * 
     * @param {number} index 
     */
    deleteAddressCard(index: number) {
        const deletedAddress: any = this.addressForms.at(index).value;
        for (let address of this.company.enderecos) {
            if (address.equals(deletedAddress)) {
                this.deletedAddresses.push(address);
                break;
            }
        }
        this.addressForms.removeAt(index);
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
        while (this.addressForms.length !== 0) {
            this.addressForms.removeAt(0);
        }
    }

    /**
     * If the variable company is not null, then it's edit mode, it'll be create mode otherwise
     */
    getRouterURL(): string {
        return this.company ? "edit" : "create";
    }


}
