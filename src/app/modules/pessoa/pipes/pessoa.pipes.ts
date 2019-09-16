import { PipeTransform, Pipe } from '@angular/core';
import { formatToCPF } from 'brazilian-values';

@Pipe({
    name: "cpf"
})
export class CPF implements PipeTransform {

    transform(value: string){
        return formatToCPF(value);
    }

}