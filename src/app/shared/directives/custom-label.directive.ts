// Las directivas para ser usadas por otros modulos deben ser exportadas
// en el module.ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

// *IMPORTANTE una directiva puede ser usada por todo elemento html al que se le
// *coloque el selector. Siempre que este importada en el modulo. Para este ejemplo
// *se utiliza un span dentro de product-page, pero la misma directiva puede ser
// *usada por varios elementos dentro de una misma pagina o en varias paginas
// *distintas al mismo tiempo
@Directive({
  // notese que el selector esta entre [], esto significa que se puede utilizar en
  // multiples elementos html. Las directivas se ponen en lowerCamelCase en lugar
  // de estar separadas por - como los selectores comunes, esto es un estilo
  // recomendado no es obligatorio
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  // definimos las variables
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  // se usa el set solo para las directivas
  // tomamos el valor de la variable color definida en el product-page.component.ts
  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    // asignamos el elemento html a la directiva, en este caso un span de
    // product-page.component.html
    this.htmlElement = el;
  }
  ngOnInit(): void {
    this.setStyle();
  }

  // cambiamos el color del texto del span de product-page.component.html
  setStyle() {
    // nos aseguramos de que exista el elemento
    if (!this.htmlElement) return;
    // asignamos el color
    this.htmlElement.nativeElement.style.color = this._color;
  }

  // cambiamos los mensajes de error
  setErrorMessage(): void {
    // nos aseguramos de que exista el elemento
    if (!this.htmlElement) return;
    // si no hay errores limpiamos el span
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    // creamos un array con las claves de los errores
    const errors = Object.keys(this._errors);
    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requirido';
      return;
    }
    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `El nombre necesita ${
        min - current
      } caracteres`;
      return;
    }
    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText =
        'El formato de email no es valido';
      return;
    }
  }
}
