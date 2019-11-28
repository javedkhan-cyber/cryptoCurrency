import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injectable, ViewContainerRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient,HttpResponse,HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/';
import {RouterModule,Routes,Router} from '@angular/router';
// import {DataTableModule} from "angular-6-datatable";
import { DataTableModule } from 'ng-angular8-datatable';
import { AppComponent } from './app.component';
import { ListviewComponent } from './listview/listview.component';

import { CryptoserviceService } from './cryptoservice.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { CookieService } from 'ngx-cookie-service';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ChartModule } from 'angular-highcharts';
import { Chart} from 'angular-highcharts';
import 'hammerjs';
import { PricechartviewComponent } from './pricechartview/pricechartview.component';
import { ComparisonviewComponent } from './comparisonview/comparisonview.component';




@NgModule({
  declarations: [
    AppComponent,
    ListviewComponent,
    PricechartviewComponent,
    ComparisonviewComponent,
  
   
   
  ],
  imports: [
    ChartModule,
    MatCheckboxModule,
    MatSliderModule,
    MatIconModule,
    MatSlideToggleModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    DataTableModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar:true,
      onActivateTick:true,
      closeButton:true
    }),
    RouterModule.forRoot([
      {path:'app',component :AppComponent},
      {path:'listview',component:ListviewComponent},
      {path:'comparison',component:ComparisonviewComponent},
     {path:'pricechart',component: PricechartviewComponent}
     ])
  ],
  providers: [CryptoserviceService,CookieService],
  exports:[
    RouterModule,MatSliderModule,MatSlideToggleModule,MatIconModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
