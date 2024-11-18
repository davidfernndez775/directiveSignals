import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
})
export class CounterPageComponent {
  // creamos una signal
  public counter = signal(10);
  // creamos una signal de solo lectura, las modificaciones a su valor
  // dependen de la ecuacion que contiene y los cambios en sus variable
  public squareCounter = computed(() => this.counter() ** 2);

  increaseBy(value: number) {
    this.counter.update((current) => current + value);
  }
}
