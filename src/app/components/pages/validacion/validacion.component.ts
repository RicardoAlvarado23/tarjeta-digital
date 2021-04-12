import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Cuestionario, Respuesta } from '../../../models/cuestionario.model';
import { AppState } from '../../../app.reducers';
import { Subscription } from 'rxjs';
import { Cliente } from '../../../models/cliente.model';
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
export class ValidacionComponent implements OnInit, OnDestroy {

  respuestas: Respuesta[] = [];

  cuestionario: Cuestionario;
  
  mostrarPaginaUno = true;
  mostrarPaginaDos = false;
  mostrarPaginaTres = false;
  @ViewChild('templateCam', { static: true }) templateCam: TemplateRef<any>;
  dialogFloat: any;
  cliente: Cliente;
  private suscriptionCliente: Subscription;

  constructor( private dialog: MatDialog,
               private http: HttpClient,
               private store: Store<AppState>
    ) {

      }


  ngOnInit(): void {
    this.suscriptionCliente = this.store.select('cliente').subscribe(({cliente}) => {
      console.log(cliente);
      this.cliente = cliente;
      console.log(this.cliente);
      this.obtenerCuestionario();
    });
    // this.obtenerCuestionario();
  }

  ngOnDestroy(): void {
    this.suscriptionCliente.unsubscribe();
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


  obtenerCuestionario() {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('TJDIGITAL:Qk55cHdhb3QhZ29MWkM9Q1pCUFRO') });
    this.http.post('http://localhost:8082/cmac-tarjeta-digital/panel/obtener-cuestionario', {
      tipoDocumento: this.cliente.tipoDocumento,
      doi: this.cliente.numeroDocumento,
      celular: this.cliente.celular
    }, {
      headers
    }).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.cuestionario = data.viso_cuestionario;
        console.log(this.cuestionario);
        const preguntas = this.cuestionario.Preguntas;
        for (let index = 0; index < preguntas.length; index++) {
          const respuesta = new Respuesta(preguntas[index].CodPregunta);
          this.respuestas.push(respuesta);
        }
        console.log(this.cuestionario);
        console.log(this.respuestas);
        console.log(this.validarCuestionarioCompleto());
      }
    })
  }

  setAlternativaPregunta(codigoPregunta, codigoAlernativa) {
    console.log({codigoPregunta, codigoAlernativa});
  }

  validarCuestionarioCompleto() {
    let completados = 0;
    this.respuestas.forEach((rpta) => {
      if (rpta.codigoRespuesta) {
        completados++;
      }
    });
    return completados == this.respuestas.length
  }

}
