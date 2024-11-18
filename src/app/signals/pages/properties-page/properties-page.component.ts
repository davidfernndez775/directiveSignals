import { Component, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
})
export class PropertiesPageComponent {
  public counter = signal(10);
  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  });

  public fullName = computed(
    () => `${this.user().first_name} ${this.user().last_name}`
  );
  public userChangeEffect = effect(() => {
    console.log(`${this.user()} - ${this.counter()}`);
  });

  // en lugar de poner un string se usa keyof para garantizar que los campos
  // esten contenidos dentro de la interfaz User
  onFieldUpdate(field: keyof User, value: string) {
    this.user.update((current) => {
      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }
      return current;
    });
  }

  increaseBy() {
    this.counter.update((current) => current + 1);
  }
}
