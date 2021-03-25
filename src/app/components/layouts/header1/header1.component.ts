import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {

  mostrarLink: boolean = true;

  constructor(private router: Router) {
    const ruta = this.router.url;
    if (ruta.indexOf('solicitud') != -1) {
      this.mostrarLink = false;
    } else {
      this.mostrarLink = true;
    }
  }

  ngOnInit(): void {
  }

}
