import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  // realizamos la inyeccion por otro metodo distinto al constructor
  // ambos son validos
  private fb = inject(FormBuilder);

  public color: string = 'green';

  public myForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(6), Validators.email],
    ],
  });

  changeColor() {
    this.color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
  }
}
