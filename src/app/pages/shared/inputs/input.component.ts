import { OnInit, Component } from '@angular/core';
import { SALARIO_MINIMO } from '../../../util/variable';


@Component({
    selector: 'app-inputs',
    templateUrl: './input.component.html'
})

export class InputsComponent implements OnInit {

    // Para input de valor monetario, muito util.
    formatCurrency(inputNumber: any): void {
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete'];
        if (!allowedKeys.includes(inputNumber.key)) {
            inputNumber.preventDefault();
            return;
        }
        let value = inputNumber.target.value.replace(/\D/g, '');
        if (inputNumber.key === 'Backspace' || inputNumber.key === 'Delete') {
            value = value.slice(0, -1);
        } else {
            value += inputNumber.key;
        }
        if (value.length === 0) {
            value = '0.00';
        } else if (value.length === 1) {
            value = '0.0' + value;
        } else if (value.length === 2) {
            value = '0.' + value;
        } else {
            value = value.slice(0, -2) + '.' + value.slice(-2);
        }
        const isValid = /^\d+(\.\d{1,2})?$/.test(value);

        // FormGroup
        this.formCalcularContribuicao.controls['valorSalario'].setValue(parseFloat(value));

        // this.formCalcularContribuicao.controls['valorSalario']?.setValue(parseFloat(value)); // For Angular TypeSript 3.7+

        if (isValid && this.formCalcularContribuicao.controls['valorSalario'].value >= SALARIO_MINIMO) {
            this.formCalcularContribuicao.controls['valorSalario'].setErrors(null);
        }
        else if (isValid && this.formCalcularContribuicao.controls['valorSalario'].value < SALARIO_MINIMO) {
            this.formCalcularContribuicao.controls['valorSalario'].setErrors({ salarioMinimoInvalido: true });
        }
        else {
            this.formCalcularContribuicao.controls['valorSalario'].setErrors({ invalidFormat: true });
        }
        inputNumber.target.value = parseFloat(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        inputNumber.preventDefault();
    }
}

function Componetnt(arg0: { selector: string; templateUrl: string; }): (target: typeof InputsComponent) => void | typeof InputsComponent {
    throw new Error('Function not implemented.');
}
