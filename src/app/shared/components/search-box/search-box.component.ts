import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [

  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription

  @Input()
  public placeholder: string = '';

  //es un sub etiqueta que usa la etiqueta principal como una clase
  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer // se suscribe
    .pipe(
      debounceTime(500)
      )
      .subscribe( value => {//emito el valor
        //console.log('debouncer value', value)
        this.onDebounce.emit( value );
      });
    }

    ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
    }

    //emite el valor que ingresa en el input txtInput.value
    emitValue( value: string ): void {
    this.onValue.emit(value)
  }

  //debounce: cuando deje de escribir disparar la consulta
  onKeyPress( searchTerm: string ){
    this.debouncer.next(searchTerm);
  }

}
