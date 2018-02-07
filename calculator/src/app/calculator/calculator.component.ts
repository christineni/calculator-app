import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  templateUrl: 'calculator.component.html',
  styleUrls: ['calculator.component.css']
})

export class CalculatorComponent {
  operation: string[] = ['', '', ''];
  display: string = '';
  subDisplay: string = '';
  selectedNumber: string = '';
  result: number = 0;

  currentExpression(): void {
    this.display = this.operation.join(' ');
  }

  expressionBuilder(num: string): void {
    this.selectedNumber += num;
    if (this.selectedNumber.match(/\./g) != null && this.selectedNumber.match(/\./g).length > 1) {
      this.resetOperation();
      this.displayError();
      this.subDisplay = 'Cannot have two decimal points';
      return;
    }
    if (this.operation[1].length) {
      if (num === '' || this.operation[2].startsWith('-')) {
        this.operation[2] = '-' + this.selectedNumber;
      }
      else {
        this.operation[2] = this.selectedNumber;
      }
    }
    else {
      if (num === '' || this.operation[0].startsWith('-')) {
        this.operation[0] = '-' + this.selectedNumber;
      }
      else {
        this.operation[0] = this.selectedNumber;
      }
    }
    this.subDisplay = '';
    this.currentExpression();
  }

  selectOperator(operator: string): void {
    if (!this.operation[0].length) {
      this.displayError();
      this.subDisplay = 'Enter First Number';
      return;
    }
    this.operation[1] = operator;
    this.selectedNumber = '';
    this.currentExpression();
  }

  displayError(): void {
    this.display = 'Error'
  }
  
  showResult(): void {
    if (this.validateSelections()) {
      let value = this.calculate();
      this.display = '' + value;
      this.subDisplay = this.operation.join(' ');
      this.resetOperation()
    }
  }

  validateSelections(): boolean {
    if (!this.operation[0].length) {
      this.displayError()
      this.subDisplay = 'Enter First Number';
      return false;
    } else if (!this.operation[1].length) {
      this.displayError()
      this.subDisplay = 'Enter Operator';
      this.resetOperation();
      return false;
    } else if (!this.operation[2].length) {
      this.displayError()
      this.subDisplay = 'Enter Second Number';
      return false;
    }
    return true;
  }

  calculate(): number {
    switch (this.operation[1]) {
      case "+":
        this.result = parseFloat(this.operation[0]) + parseFloat(this.operation[2]);
        return this.result;
      case "-":
        this.result = parseFloat(this.operation[0]) - parseFloat(this.operation[2]);
        return this.result;
      case '*':
        this.result = parseFloat(this.operation[0]) * parseFloat(this.operation[2]);
        return this.result;
      case '/':
        if (parseFloat(this.operation[2]) === 0) {
          return undefined;
        }
        this.result = parseFloat(this.operation[0]) / parseFloat(this.operation[2]);
        return this.result;
      case '%':
        this.result = parseFloat(this.operation[0]) % parseFloat(this.operation[2]);
        return this.result;
    }
  }

  resetOperation(): void {
    if (this.operation[1] === "+" || this.operation[1] === "-" || this.operation[1] === "*" || this.operation[1] === "/") {
      this.operation = [String(this.result), '', ''];
      this.selectedNumber = '';
    }
    else {
      this.operation = ['', '', ''];
      this.selectedNumber = '';
    }
  }

  reset(): void {
    this.operation = ['', '', ''];
    this.selectedNumber = '';
    this.display = '';
    this.subDisplay = '';
  }
}
