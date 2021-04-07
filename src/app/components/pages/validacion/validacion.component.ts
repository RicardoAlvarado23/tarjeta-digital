import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css'],
  animations: [
    trigger('fadeInRight', [
        transition(':enter', [
          style({
            transform: 'translateX(-20px)',
            opacity: 0
          }),
          animate(`400ms cubic-bezier(0.35, 0, 0.25, 1)`, style({
            transform: 'translateX(0)',
            opacity: 1
          }))
        ])
    ]),
    trigger('fadeInRight800', [
      transition(':enter', [
        style({
          transform: 'translateX(-20px)',
          opacity: 0
        }),
        animate(`800ms cubic-bezier(0.35, 0, 0.25, 1)`, style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ]),
    trigger('fadeInLeft', [
        transition(':enter', [
          style({
            transform: 'translateX(20px)',
            opacity: 0
          }),
          animate(`600ms cubic-bezier(0.35, 0, 0.25, 1)`, style({
            transform: 'translateX(0)',
            opacity: 1
          }))
        ])
    ])
  ]
})
export class ValidacionComponent implements OnInit {

  respuestas = [
    {valor: '1', etiqueta: 'Respuesta 1'},
    {valor: '2', etiqueta: 'Respuesta 2'},
    {valor: '3', etiqueta: 'Respuesta 3'},
    {valor: '4', etiqueta: 'Respuesta 4'},
    {valor: '5', etiqueta: 'Respuesta 5'}
  ];
  
  mostrarPaginaUno = true;
  mostrarPaginaDos = false;
  mostrarPaginaTres = false;
  @ViewChild('templateCam', { static: true }) templateCam: TemplateRef<any>;
  dialogFloat: any;

  constructor( private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  paginaDos() {
    this.mostrarPaginaUno = false;
    this.mostrarPaginaDos = true;
    this.mostrarPaginaTres = false;
    $('html, body').animate({
      scrollTop: '0',
      },
      1200
    );
  }

  paginaTres() {
    this.mostrarPaginaUno = false;
    this.mostrarPaginaDos = false;
    this.mostrarPaginaTres = true;
    this.dialogFloat.close();
    $('html, body').animate({
      scrollTop: '0',
      },
      1200
    );
  }

  iniciarGrabacion() {
    this.dialogFloat = this.dialog.open(this.templateCam, {
      maxWidth: '40vw'
    });
  }

}
