import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorService } from './services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [],
  providers: [InterceptorService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  imports: [
    CommonModule
  ]
})
export class AppInterceptorModule { }
