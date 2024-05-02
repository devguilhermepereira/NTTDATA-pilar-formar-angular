import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessService } from '../../shared/service/business.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrl: './accounts-payable.component.css'
})
export class AccountsPayableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'company', 'date', 'value'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  constructor(private businessService: BusinessService) {
  }


  ngOnInit() {
    this.getAccountsPayable();

  }


  getAccountsPayable() {
    this.businessService.getAccountsPayable().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
