import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit, OnDestroy {

  mostrarLink = true;
  mostrarCountDown = false;
  suscription: Subscription;
  time: number;

  constructor(private router: Router, private store: Store<AppState>) {
    const ruta = this.router.url;
    if (ruta.indexOf('solicitud') != -1 ||  ruta.indexOf('validacion') != -1) {
      this.mostrarLink = false;
    } else {
      this.mostrarLink = true;
    }
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  ngOnInit(): void {
    this.suscription = this.store.select('ui').subscribe(({time}) => {
      this.mostrarCountDown = time !== 0;
      this.time = time;
    });
  }

}
