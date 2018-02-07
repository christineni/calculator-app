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
    // if operator is selected, set second operand
    if (this.operation[1].length) {
      this.operation[2] = this.selectedNumber;
    }
    // else set first operand, clear subDisplay
    else {
      this.operation[0] = this.selectedNumber;
      this.subDisplay = '';
    }
    this.currentExpression();
  }

  // store operator selected
  selectOperator(operator: string): void {
    if (!this.operation[0].length) {
      this.displayError();
      this.subDisplay = 'Select a number first';
      return;
    }
    this.operation[1] = operator;
    this.selectedNumber = '';
    this.currentExpression();
  }

  // renders display of operand(s) and operator selected
  showResult(): void {
    if (this.validateSelections()) {
      let value = this.calculate();
      this.display = '' + value;
      this.subDisplay = this.operation.join(' ');
      this.resetOperation()
    }
  }

  // validate user selections
  validateSelections(): boolean {
    if (!this.operation[0].length) {
      this.displayError()
      this.subDisplay = 'Enter First Number';
      return false;
    } else if (!this.operation[1].length) {
      this.displayError()
      this.subDisplay = 'Enter Operator';
      return false;
    } else if (!this.operation[1].length) {
      this.displayError()
      this.subDisplay = 'Enter Second Number';
      return false;
    }
    return true;
  }

  calculate(): number {
    switch (this.operation[1]) {
      case "+":
        return parseFloat(this.operation[0]) + parseFloat(this.operation[2]);
      case "-":
        return parseFloat(this.operation[0]) - parseFloat(this.operation[2]);
      case '*':
        return parseFloat(this.operation[0]) * parseFloat(this.operation[2]);
      case '/':
        if (parseFloat(this.operation[2]) === 0) {
          return undefined;
        }
        return parseFloat(this.operation[0]) / parseFloat(this.operation[2]);
      case '%':
        return parseInt(this.operation[0]) % parseFloat(this.operation[2]);
    }
  }

  resetOperation(): void {
    this.operation = ['', '', ''];
    this.selectedNumber = '';
  }

  reset(): void {
    this.operation = ['', '', ''];
    this.selectedNumber = '';
    this.display = '';
    this.subDisplay = '';
  }

  displayError(): void {
    this.display = 'Error!'
  }
}
