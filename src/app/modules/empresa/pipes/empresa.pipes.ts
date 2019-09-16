import { PipeTransform, Pipe } from '@angular/core';
import { formatToCNPJ } from 'brazilian-values';

@Pipe({
    name: "cnpj"
})
export class CNPJ implements PipeTransform {

    transform(value: string){
        return formatToCNPJ(value);
    }

}