import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessService } from '../../shared/service/business.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';



@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrl: './accounts-payable.component.css'
})
export class AccountsPayableComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  accounts: Array<any> = [];
  accountsMock: Array<any> = [];
  accountsLocalStorage: Array<any> = [];
  accountsRxjs: BehaviorSubject<any> = new BehaviorSubject<any>({});

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['title', 'company', 'date', 'value'];


  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  constructor(private businessService: BusinessService, private fromBuilder: FormBuilder
  ) {
    this.createForm();
  }


  ngOnInit() {
    this.getAccountsPayableLocalStorage();
  }

  createForm() {
    this.form = this.fromBuilder.group({
      title: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    })
  }

  getAccountsPayableLocalStorage() {
    const accounts: any = localStorage.getItem('accountsPayable');
    const data = accounts ? JSON.parse(accounts) : [];
    this.accountsLocalStorage = data;
    this.getAccountsPayableMOCK();
  }

  getAccountsPayableMOCK() {
    this.businessService.getAccountsPayable().subscribe((res: any) => {
      this.accountsMock = res;
      this.accounts = this.accountsMock;
      this.accountsLocalStorage.forEach(row => this.accounts.push(row))
      this.setDataInTable();
    })
  }

  setDataInTable() {
    this.dataSource = new MatTableDataSource(this.accounts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  save() {
    const data = this.form.value;
    this.accounts.push(data);
    // SALVAMENTO COM LOCALSTORAGE
    this.accountsLocalStorage.push(data);
    localStorage.setItem('accountsPayable', JSON.stringify(this.accountsLocalStorage));
    // SALVAMENTO COM RXJS
    this.accountsRxjs.next(data);
    // INCLUIR A CONTA NOVA NA TABELA
    this.setDataInTable();
    this.form.reset();
  }
}
