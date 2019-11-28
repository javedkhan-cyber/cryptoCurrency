import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CryptoserviceService} from './cryptoservice.service'
import {NgModel} from '@angular/forms';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Crypto Currency';
  public listview="/listview";
  public comparison="/comparison";
  public pricechart="/pricechart";
  public a:any={};
  constructor(public _route:ActivatedRoute,public router:Router,private location:Location,public toastr:ToastrService,public cryptoservice:CryptoserviceService){
    
  }


  public currencylist():any {
    this.cryptoservice.currencylist().subscribe(
      data =>{
       // console.log(data.data);
       this.a= data.data;
        for(let i in this.a)
        {
        //  console.log(this.a[i]); //getting all data like USD{}
         // console.log(this.a[i].name); // name of currency
        }
       // console.log(this.a);
      },
      error=>{
        console.log("Error");
        console.log(error.status);
            
      }
      
    )
  }
public garr:any=[];
  public globaldata():any {
    this.cryptoservice.globaldata().subscribe(
      data =>{
       // console.log(data.data);
       this.garr = data.data;
        console.log(this.garr);
      },
      error=>{
        console.log("Error");
        console.log(error.status);
            
      }
      
    )
  }

  ngOnInit() {
    this.toastr.show('Welcome in :CryptoCurrency System');
    this.currencylist();
    this.globaldata();
  }
}
