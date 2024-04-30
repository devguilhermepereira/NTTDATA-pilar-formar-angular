import { Component } from '@angular/core';


const ELEMENT_DATA: any = [
  { name: 'conta 1', value: 'R$ 1.500,00',},
  { name: 'conta 2', value: 'R$ 1.500,00',},
  { name: 'conta 3', value: 'R$ 862,00',},
  { name: 'conta 4', value: 'R$ 1.222,00',},
  { name: 'conta 5', value: 'R$ 1.500,00',},
  { name: 'conta 6', value: 'R$ 1.500,00',},
  { name: 'conta 7', value: 'R$ 4.500,00',},
  { name: 'conta 8', value: 'R$ 1.500,00',},
  { name: 'conta 9', value: 'R$ 2.500,00',},
  { name: 'conta 10', value: 'R$ 3.500,00',},
];


@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrl: './accounts-payable.component.css'
})
export class AccountsPayableComponent {
  displayedColumns: string[] = ['name', 'value'];
  dataSource = ELEMENT_DATA;
}
