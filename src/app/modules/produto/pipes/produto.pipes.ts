import { PipeTransform, Pipe } from '@angular/core';
import { formatToBRL } from 'brazilian-values';

@Pipe({
    name: "br_money"
})
export class BRMoney implements PipeTransform {

    transform(value: number){
        return formatToBRL(value);
    }

}