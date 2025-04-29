// src/app/companies/company-list/company-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  MatTableModule,
  MatTableDataSource
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ]
})
export class CompanyListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  columns = ['name', 'actions'];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getCompanies().subscribe(list => {
      this.dataSource.data = list;
    });
  }
}
