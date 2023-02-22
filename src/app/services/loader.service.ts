import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  loaderSubject: Subject<boolean>  = new Subject<boolean>();

  private sendMessage(loader: boolean) {
    this.loaderSubject.next(loader);
  }

  public mostrar() {
    this.sendMessage(true);
  }

  public ocultar() {
    this.sendMessage(false);
  }
}
