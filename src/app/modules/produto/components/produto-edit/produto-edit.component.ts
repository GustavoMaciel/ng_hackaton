import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/shared-components/base-edit.component';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto, Categoria, CATEGORIES } from '../../produto';

@Component({
    selector: 'app-produto-edit',
    templateUrl: './produto-edit.component.html',
    styleUrls: ['./produto-edit.component.scss']
})
export class ProdutoEditComponent extends BaseEditComponent {

    /**Product FormGroup
     * @type {FormGroup}
     */
    formGroup: FormGroup;

    /**Category FormGroup
     * @type {FormGroup}
     */
    categoryForm: FormGroup

    /**
     * Constructor with injectables
     * 
     * @param formBuilder 
     * @param service 
     * @param route 
     */
    constructor(formBuilder: FormBuilder, service: ProdutoService, route: ActivatedRoute) {
        super(formBuilder, route, service);
    }

    /**
     * Convenience getters to access the form fields
     */
    get form() { return this.formGroup.controls }
    get categoryForms() { return this.form.categories as FormArray }
    get product() { return this.item }
    get categoryNames() { return CATEGORIES }

    /**
     * Convenience setters
     */
    set product(product: Produto) { this.item = product }

    /**
     * Calls super class' ngOnInit
     */
    ngOnInit() {
        super.ngOnInit();
    }

    /**
     * Populate the FormArray with the existent categories
     */
    populateCategoryFormArray(): void {
        for (let category of this.product.categories) {
            this.categoryForms.push(this.formBuilder.group({
                name: [category.name, Validators.required],
            }));
        }
    }

    /**
     * Return a new Object to be used in the formBuilder
     * If it's editing will build the object using the product variable fields
     */
    generateForm(): void {
        if (this.isEditing) {
            this.formGroup = this.formBuilder.group(
                {
                    name: [this.product.name, Validators.required],
                    description: [this.product.description, Validators.required],
                    value: [this.product.value, [Validators.required, Validators.min(1)]],
                    categories: new FormArray([])
                },
            );
            this.populateCategoryFormArray();
        } else {
            this.formGroup = this.formBuilder.group(
                {
                    name: ['', Validators.required],
                    description: ['', Validators.required],
                    value: ['', [Validators.required, Validators.min(1)]],
                    categories: new FormArray([])
                },
            );
            this.onAddCategoryClick();
        }
    }

    /**
     * Saves all the categories of the informed Product
     * 
     * @param {Produto} product 
     */
    saveNewCategories(product: Produto): void {
        product.categories = []
        let i = 0;
        for (let category of this.categoryForms.controls) {
            let cat: Categoria = null
            this.service.getCategory(category.value.name).subscribe(res => { cat = res; }, err => console.log(err));

            if (cat) {
                product.categories.push(cat)
            } else {
                this.categoryForms.at(i).setErrors({ invalidCategory: true })
            }
            i++;
        }
    }

    updateProduct(){
        this.product.name = this.form.name.value;
        this.product.description = this.form.description.value;
        this.product.value = this.form.value.value;

        this.service.update(this.product).subscribe(result => {
            this.navigate(['produto', 'view', this.product.id]);
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
            this.product = new Produto(
                this.form.name.value, this.form.description.value, this.form.value.value
            );
        }
        this.saveNewCategories(this.product);

        if (this.isEditing) {
            this.updateProduct();
        } else {
            this.service.create(this.product).subscribe(result => {
                this.navigate(['produto']);
            }, err => {
                console.log(err);
            });
        }
    }

    /**
     * Adds a new category card in the categories array
     */
    onAddCategoryClick() {
        this.categoryForms.push(this.formBuilder.group(
            {
                name: ['', Validators.required],
            }
        ));

        return false;
    }

    /**
     * Deletes the Category card with the informed index
     * 
     * @param {number} index 
     */
    deleteCategoryCard(index: number) {
        this.categoryForms.removeAt(index);
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
        while (this.categoryForms.length !== 0) {
            this.categoryForms.removeAt(0);
        }
        this.onAddCategoryClick();
    }

    /**
     * If the variable product is not null, then it's edit mode, it'll be create mode otherwise
     */
    getRouterURL(): string {
        return this.product ? "edit" : "create";
    }

}
