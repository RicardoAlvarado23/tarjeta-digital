import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/layouts/preloader/preloader.component';
import { Header1Component } from './components/layouts/header1/header1.component';
import { Header2Component } from './components/layouts/header2/header2.component';
import { Header3Component } from './components/layouts/header3/header3.component';
import { ShopSidebarComponent } from './components/layouts/shop-sidebar/shop-sidebar.component';
import { BlogSidebarComponent } from './components/layouts/blog-sidebar/blog-sidebar.component';
import { ServiceSidebarComponent } from './components/layouts/service-sidebar/service-sidebar.component';
import { Footer1Component } from './components/layouts/footer1/footer1.component';
import { Footer2Component } from './components/layouts/footer2/footer2.component';
import { Homepage1Component } from './components/pages/homepage1/homepage1.component';
import { FormularioComponent } from './components/pages/formulario/formulario.component';
import { MaterialModule } from './material.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    Header1Component,
    Header2Component,
    Header3Component,
    ShopSidebarComponent,
    BlogSidebarComponent,
    ServiceSidebarComponent,
    Footer1Component,
    Footer2Component,
    Homepage1Component,
    FormularioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    NgxCaptchaModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }