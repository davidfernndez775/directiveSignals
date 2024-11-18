import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css',
})
export class UserInfoPageComponent implements OnInit {
  // injectamos el servicio http
  private userService = inject(UserService);
  // definimos la id del usuario
  public userId = signal(1);
  // definimos el usuario actual
  public currentUser = signal<User | undefined>(undefined);
  // definimos una bandera que indica que el usuario fue encontrado
  public userWasFound = signal(true);
  // definimos una signal para el nombre completo
  public fullName = computed<string>(() => {
    if (!this.currentUser) return 'Usuario no encontrado';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  // cargamos el usuario al inicializar el componente
  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  // funcion que hace la peticion http de acuerdo al id
  loadUser(id: number) {
    // se comprueba que el id es mayor a 0
    if (id <= 0) return;
    this.userId.set(id);
    // el usuario actual pasa a undefined antes de hacer una peticion
    // para que no se muestre informacion vieja mientras transcurre el
    // tiempo de ejecucion de la peticion
    this.currentUser.set(undefined);
    // se realiza la peticion
    this.userService.getUserById(id).subscribe({
      // si recibe el valor esperado
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      // si devuelve un error
      error: () => {
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      },
    });
  }
}
