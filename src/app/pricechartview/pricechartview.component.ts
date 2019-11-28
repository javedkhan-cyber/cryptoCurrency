import { Component,OnInit, NgModule,Directive,Input,Output,EventEmitter,HostBinding,ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute,Router,Params, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CryptoserviceService} from '../cryptoservice.service'
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-pricechartview',
  templateUrl: './pricechartview.component.html',
  styleUrls: ['./pricechartview.component.css']
})
export class PricechartviewComponent implements OnInit {

  chart: Chart;
  public allData:any=[];
  public compareArray:any=[];
  public d = new Date();
  public val1:any;
  public val2:any;
  
  constructor(public _route:ActivatedRoute,public router:Router,public toastr:ToastrService,public cryptoservice:CryptoserviceService){
   
    console.log("Price-View has been called");
    
}


  public getSingle(sId):any {

    this.cryptoservice.getSpecific(sId).subscribe(
      data =>{
        
                  if(sId==data.data.id ){
                    console.log(sId);
                    console.log(data.data.id)
                    this.d.setHours(
                      this.compareArray.push(data.data),
                    24);
                                         }
      
        //chart data
       
    let chart = new Chart({
      chart: {
        type: 'spline'
              },

        title: {
        text: 'Price Chart'
                },

      xAxis: {
        //type: 'xrange',
            title: {
              text: 'Coins'
                    }
             },
    credits: {
      enabled: false
             },
      yAxis: {
            title: {
            text: 'Price'
                   }
             },
                    series: [{
                    type:'spline',
                      name: 'Price',
                      data:  [{
                        id: this.compareArray[0].symbol,
                          name: this.compareArray[0].name,
                          y: this.compareArray[0].quotes.USD.price
                              }]
                               }, 
    {
      type:'spline',
      name:"Volume_24h",
      data: [{
        id: this.compareArray[0].symbol,
          name: this.compareArray[0].name,
          y: this.compareArray[0].quotes.USD.volume_24h
      }]
    }
  ]
  });
      //console.log(this.comparearray[0].id);
    this.chart = chart;
    chart.ref$.subscribe(console.log);


      },
      error=>{
        console.log("Error");
        console.log(error.status);
        // this.toastr.warning("Please Select From List"); 
        // return true;
       
              })
 }

  ngOnInit() {
    this.toastr.success("See Price Chart");
    //here we get data through id and make url across route
     this._route.queryParams.subscribe((params: Params) => {
       if(params!=undefined)
       
       {
        console.log(params.pc);
        this.val1=params.pc;      //get id on url and kept in val1
        
       }
     
       else {
         console.log("There is no request");
       }
      
       if(params.pc==undefined){
        this.toastr.error("Please Go to List View and Click View Chart..");
      }
    });
 
    this.getSingle(this.val1); 
  }

}
