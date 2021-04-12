import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment, MASK_DOC_NUMBER } from 'src/environments/environment';
import { AppState } from '../../../app.reducers';
import { setCliente } from './formulario.actions';
import { Cliente } from '../../../models/cliente.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
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
export class FormularioComponent implements OnInit {

  form: FormGroup;
  maskDocumento = {};
  sitekey = environment.keyRecaptcha;
  ruta = './assets/img/illustration/pj_03.png';
  mostrarConfirmacion = false;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'es';
  public type: 'image' | 'audio' = 'image';
  public useGlobalDomain: boolean = false;

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild('langInput') langInput: ElementRef;

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private store: Store<AppState>
    ) { 
    this.maskDocumento = { mask: MASK_DOC_NUMBER, guide: false };
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      dni: new FormControl('', [Validators.required, Validators.minLength(8),
          Validators.maxLength(8), this.sanitizeHtml, this.sanitizeUri]),
      email: new FormControl('', [Validators.required, Validators.email,
          Validators.maxLength(60), this.sanitizeHtml, this.sanitizeUri]),
      celular: new FormControl('', [Validators.required, Validators.minLength(9),
          Validators.maxLength(9), this.sanitizeHtml, this.sanitizeUri]),
      captcha: new FormControl('', Validators.required),
      agree: new FormControl(true)
    });
  }

  enviar() {
    this.mostrarConfirmacion = true;
  }

  validarCliente() {
    const { dni, email, celular } = this.form.value;
    const cliente =  new Cliente();
    cliente.celular = celular;
    cliente.email = email;
    cliente.numeroDocumento = dni;
    cliente.tipoDocumento = '1';
    this.store.dispatch(setCliente({cliente}))
    this.router.navigateByUrl('/validacion');
  }


  /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
   isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
        return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
    }

    sanitizeHtml(control: FormControl) {
        let valor = control.value;
        if (valor) {
            const txt = document.createElement('textarea');
            txt.innerHTML = valor;
            valor = txt.value;
            txt.remove();
        }
        const rgx = /<(\"[^\"]*\"|'[^']*'|[^'\">])*>/;
        if (rgx.test(valor)) {
            return {
            sanitize: {
                sanitize: true
            }
            };
        }
        return null;
    }

    sanitizeUri(control: FormControl) {
        const valor = control.value;
        if (valor) {
            let uri = decodeURIComponent(valor);
            const rgx = /<(\"[^\"]*\"|'[^']*'|[^'\">])*>/;
            if (rgx.test(uri)) {
            return {
                sanitize: {
                sanitize: true
                }
            };
            }
        }
        return null;
    }

    decodeHtml(html) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      const valor = txt.value;
      txt.remove();
      return valor;
    }

    handleReset(): void {
        this.captchaSuccess = false;
        this.captchaResponse = undefined;
        this.captchaIsExpired = false;
        this.cdr.detectChanges();
    }

    handleSuccess(captchaResponse: string): void {
        this.captchaSuccess = true;
        this.captchaResponse = captchaResponse;
        this.captchaIsExpired = false;
        this.cdr.detectChanges();
        this.cdr.markForCheck();
    }

    handleLoad(): void {
        this.captchaIsLoaded = true;
        this.captchaIsExpired = false;
        this.cdr.detectChanges();
    }

    handleExpire(): void {
        this.captchaSuccess = false;
        this.captchaIsExpired = true;
        this.cdr.detectChanges();
    }

    reset(): void {
        this.captchaElem.resetCaptcha();
    }

}

