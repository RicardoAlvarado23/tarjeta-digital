import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Cuestionario, Respuesta, VisoResult } from '../../../models/cuestionario.model';
import { AppState } from '../../../app.reducers';
import { Subscription } from 'rxjs';
import { Cliente } from '../../../models/cliente.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { hideCountDown, showCountDown } from '../ui.actions';
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
  visoRespuesta: VisoResult;
  mostrarPaginaUno = true;
  mostrarPaginaDos = false;
  mostrarPaginaTres = false;
  @ViewChild('templateCam', { static: true }) templateCam: TemplateRef<any>;
  dialogFloat: any;
  cliente: Cliente;
  private suscriptionCliente: Subscription;

  constructor( private dialog: MatDialog,
               private http: HttpClient,
               private store: Store<AppState>,
               private router: Router,
               private spinner: NgxSpinnerService
    ) {

      }


  ngOnInit(): void {
    this.suscriptionCliente = this.store.select('cliente').subscribe(({cliente}) => {
      console.log(cliente);
      if (!cliente) {
        this.router.navigateByUrl('/');
      } else {
        this.cliente = cliente;
        console.log(this.cliente);
        this.obtenerCuestionario();
      }
    });
    // this.obtenerCuestionario();
  }

  ngOnDestroy(): void {
    this.suscriptionCliente.unsubscribe();
  }

  paginaDos() {
    let respuestas = '';
    this.respuestas.forEach((rpta) => {
      respuestas += rpta.codigoPregunta + ';' + rpta.codigoRespuesta + '|';
    });
    respuestas = respuestas.slice(0, -1);
    this.spinner.show();
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('TJDIGITAL:Qk55cHdhb3QhZ29MWkM9Q1pCUFRO') });
    this.http.post('http://localhost:8082/cmac-tarjeta-digital/panel/validar-cuestionario', {
      tipoDocumento: this.cliente.tipoDocumento,
      doi: this.cliente.numeroDocumento,
      codigoEvaluacion: this.cuestionario.CodEvaluacion,
      respuestas
    }, {
      headers
    }).subscribe((data: any) => {
      this.spinner.hide();
      this.store.dispatch(hideCountDown());
      console.log(data);
      if (data.success) {
        this.visoRespuesta = data.viso_resultado;
        if (this.visoRespuesta.CodError == '0') {
          this.mostrarPaginaUno = false;
          this.mostrarPaginaDos = false;
          this.mostrarPaginaTres = true;
          $('html, body').animate({
            scrollTop: '0',
            },
            1200
          );
        } else {
          Swal.fire({
            title: 'Mensaje del Sistema',
            text: 'Error en validar el cuestionario. El estado de su evaluación es: ' + this.visoRespuesta.Estado,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
       
      } else {
        Swal.fire({
          title: 'Mensaje del Sistema',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
   
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
    this.spinner.show();
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('TJDIGITAL:Qk55cHdhb3QhZ29MWkM9Q1pCUFRO') });
    this.http.post('http://localhost:8082/cmac-tarjeta-digital/panel/obtener-cuestionario', {
      tipoDocumento: this.cliente.tipoDocumento,
      doi: this.cliente.numeroDocumento,
      celular: this.cliente.celular
    }, {
      headers
    }).subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      if (data.success) {
        if (data.ResulVISO == 0) {
          this.cuestionario = data.viso_cuestionario;
          console.log(this.cuestionario);
          const preguntas = this.cuestionario.Preguntas;
          for (let index = 0; index < preguntas.length; index++) {
            const respuesta = new Respuesta(preguntas[index].CodPregunta);
            this.respuestas.push(respuesta);
          }
          this.store.dispatch(showCountDown({time: this.cuestionario.TiempoEvaluacion}));
          console.log(this.cuestionario);
          console.log(this.respuestas);
          console.log(this.validarCuestionarioCompleto());
        } else {
          Swal.fire({
            title: 'Mensaje del Sistema',
            text: data.ResulVISO + '. No se pudo obtener cuestionario del cliente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      } else {
        Swal.fire({
          title: 'Mensaje del Sistema',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    })
  }

  setAlternativaPregunta(codigoPregunta, codigoAlernativa) {
    console.log({codigoPregunta, codigoAlernativa});
    this.respuestas.forEach((respuesta) => {
      if (respuesta.codigoPregunta == codigoPregunta) {
        respuesta.codigoRespuesta = codigoAlernativa;
      }
    });
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
