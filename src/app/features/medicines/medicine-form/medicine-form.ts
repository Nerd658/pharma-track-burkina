import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medicine } from '../medicines';

@Component({
  selector: 'app-medicine-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './medicine-form.html',
  styleUrls: ['./medicine-form.scss']
})
export class MedicineFormComponent {
  private fb = inject(FormBuilder);

  medicine = input<Medicine | null>(null);
  isLoading = input<boolean>(false);
  submitting = output<Medicine>();
  close = output<void>();

  form = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    category: [''],
    price: [0, [Validators.required, Validators.min(1)]],
    quantity: [0, Validators.required],
    expirationDate: ['', Validators.required]
  });

  ngOnInit() {
    const currentMedicine = this.medicine();
    if (currentMedicine) {
      this.form.patchValue(currentMedicine);
    }
  }

  submit() {
    if (this.form.valid) {
      this.submitting.emit(this.form.value as Medicine);
    }
  }
}
