// src/app/customers/customer-form/customer-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CustomerFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  private id?: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) {
      this.isEdit = true;
      this.api.getCustomer(this.id).subscribe(cust => {
        this.form.patchValue(cust);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const action = this.isEdit
      ? this.api.updateCustomer(this.id!, this.form.value)
      : this.api.createCustomer(this.form.value);
    action.subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: err => console.error(err)
    });
  }
}
