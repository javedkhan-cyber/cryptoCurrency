import { Component,OnInit, NgModule,Directive,Input,Output,EventEmitter,HostBinding,ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute,Router,Params, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CryptoserviceService} from '../cryptoservice.service'
import { Chart } from 'angular-highcharts';
import { analyzeAndValidateNgModules } from '@angular/compiler';



@Component({
  selector: 'app-comparisonview',
  templateUrl: './comparisonview.component.html',
  styleUrls: ['./comparisonview.component.css']
})
export class ComparisonviewComponent implements OnInit {
  chart: Chart;
public alldata:any=[];
public val1:any;
public val2:any;
public comparearray:any=[];
public dif:any;
public gvalue:any;
public d=new Date();
  constructor(public _route:ActivatedRoute,public router:Router,public toastr:ToastrService,public cryptoservice:CryptoserviceService){
    console.log("Comparison-View called");
    
}



  add() {
    this.router.navigate(['/listview']);
  }

  public specific(sId):any {                        //method with parameter
    this.cryptoservice.getSpecific(sId).subscribe(         //get from service
      data =>{
        console.log(data.data);
                    if(sId==data.data.id || sId==data.data.id){    //check condition wheather equal or not
                      this.d.setHours(
                      this.comparearray.push(data.data),    //push data this.comparearray is selected object
                      24); 
                      
                  }

        if(this.comparearray[0].quotes.USD.price>this.comparearray[1].quotes.USD.price){
          this.gvalue=this.comparearray[0].quotes.USD.price;
          this.dif=this.comparearray[0].symbol;
        }


            else {
              this.gvalue=this.comparearray[1].quotes.USD.price;
              this.dif=this.comparearray[1].symbol;
            }
            
        let ob1=this.comparearray[1].quotes.USD.price;
        console.log(ob1);
        //chart data
        console.log();
    let chart = new Chart({
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Comparison'
      },
      yAxis: {
        title: {
            text: 'Price',
            
        }
    },
      credits: {
        enabled: false
      },
      
      series : [
      
        {
          type:'spline',
          name:"Price" , data: [{
          id: this.comparearray[0].symbol,
          name: this.comparearray[0].name,
          y: this.comparearray[0].quotes.USD.price
        }, {
          id: this.comparearray[1].symbol,
          name: this.comparearray[1].name,
          y:this.comparearray[1].quotes.USD.price
        }]} , 
        {
          type:'spline',
          name:"Volume_24h" , data: [{
          id: this.comparearray[0].symbol,
          name: this.comparearray[0].name,
          y: this.comparearray[0].quotes.USD.volume_24h
        }, {
          id: this.comparearray[1].symbol,
          name: this.comparearray[1].name,
          y:this.comparearray[1].quotes.USD.volume_24h
        }]} 
        
      ]
    });
    
      //console.log(this.comparearray[0].id);
    this.chart = chart;
    chart.ref$.subscribe(console.log);


      },
      error=>{
        console.log("Error");
        console.log(error.status);
            
      })
 }

  ngOnInit() {
     this._route.queryParams.subscribe((params: Params) => {
       if(params!=undefined)
       {
        this.toastr.success("See Your results with all details");
        console.log(params.c1);
        console.log(params.c2);
        this.val1=params.c1;
        this.val2=params.c2;
       }
       else {
         console.log("No such request");
       }
      
       if(params.c1==undefined && params.c2==undefined){
         this.toastr.error("Please Go to List View and select Coins..");
       }
    });
    //this.currencylist(); 
   this.specific(this.val1);
   this.specific(this.val2);
  }  
   

}

