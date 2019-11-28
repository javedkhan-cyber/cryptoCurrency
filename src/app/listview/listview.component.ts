import { Component,OnInit, NgModule,Directive,Input,Output,EventEmitter,HostBinding,  HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CryptoserviceService} from '../cryptoservice.service'
import {NgModel} from '@angular/forms';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

import 'hammerjs';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {
   
public displaycheckbox:boolean=false;
public pricechart="/pricechart";
public colorfav="primary";
public color = 'primary';
public  p: number = 1;
public alldata:any=[];
public datarray:any=[];
public favstatus:boolean=false;
public sortvar:boolean=false;
public len:any=[];
public favoritelink:boolean=false;
public dummyarray:any=[];
public currentfav:any=[];
public cookieValue;
public cookieID:any=[];
public ob1:any = []; public ob2:any = []; public count:number=0; public checked = false;
  constructor(public _route:ActivatedRoute,public router:Router,public toastr:ToastrService,public cryptoservice:CryptoserviceService,private cookieService: CookieService){
      console.log("list-view called");
      
  }

  
  public currencyList():any {
    this.cryptoservice.currencylist().subscribe(

        data =>{
              for(let d in data.data)
              {
                this.alldata.push(data.data[d]);
                for(let dm in this.dummyarray){
                if(this.cookieService.check(this.dummyarray[dm].id)){
                // console.log(this.dummyarray[dm].id)
                  this.cookieID.push(this.dummyarray[dm].id);
                                                                    }   
                                              }
              this.dummyarray.push(data.data[d]);
              }
        //console.log(this.dummyarray);
        
        
        for(let i in this.alldata)
        {
          this.datarray.push(this.alldata[i]);  
        }
        console.log(this.alldata);
        console.log(this.alldata.length);
        
      },
         error=>{
          console.log("Error");
          console.log(error.status);
            
                }
      
    )
  }

// for link activation
public activeLink() {
    this.datarray = [];                    //all data is here also
    if(this.datarray.length === 0){         //check condition
      for(let i in this.dummyarray)          // we get data using iteration
        {
            this.datarray.push(this.dummyarray[i]);    // we have pushed data in dummyarray
            
        }
    }
     
}

//for displaying checkbox is value or not
public checkBoxDisplay() {
  this.displaycheckbox = !this.displaycheckbox;
  
                          }

//for add favorite
public addfavorite(id) {                       // pass a parameter id
  let obj=[];                                   //assume a object for putting data
  this.favstatus = !this.favstatus;             // status false condition
  for(let f in this.dummyarray){                // we get data using iteration from dummyarray
    if(this.dummyarray[f].id===id){              //check id is equal to id
      this.toastr.success(this.dummyarray[f].name+" Added to Favorite");     //msg
      localStorage.setItem(this.dummyarray[f].id,this.dummyarray[f].name);    // set on localstorage name and id
    }
    else {}
  }
}

//remove favroute
public remfavorite(id){                                         //method with parameter
        if(localStorage.getItem(id)){                           //get id from localstorage
        localStorage.removeItem(id);                             //then remove
        this.toastr.warning("Favorite has been Removed!");       //msg
                                 }  
    else {
      this.toastr.warning(`You did not add ${id} as Favorites`);           // not have fav
         }
}

public goFavList() {                                                        //for going fav
  this.toastr.info("Here is your Favorite coins list");                     //msg
  this.favoritelink = !this.favoritelink;                                   //false condition
  this.datarray=[];                                                        //all data in datarray
   for(let dm in this.dummyarray){                                          //get data using iteration in dm
     if(localStorage.getItem(this.dummyarray[dm].id)){                     //get from localstorage with id
      this.datarray.push(this.dummyarray[dm]);                               //push in dummyarray 
    } 
  }
}


public displaySortData() {
    this.toastr.info("Choose a range to know the Price or MarketCap");

    this.sortvar = !this.sortvar;                       //false condition
    console.log(this.datarray.length);

        //here we check datarray length
          if(this.datarray.length >= 0)                   //check condition of length

              {     
                    this.datarray=[];                      // array of storage
                    for(let dta in this.dummyarray)         //get from iteration
                    {
                        this.datarray.push(this.dummyarray[dta]);     //push data
                    }
                    //console.log(this.datarray.length);
              }
                      // else if(this.datarray.length === 0)
                      // {
                      //   console.log(this.datarray.length);
                      //   for(let a in this.dummyarray)
                      //   {
                      //       this.datarray.push(this.dummyarray[a]);
                      //   }
                      //   console.log(this.datarray);
                      // } 
    else{}
}

                    //sorting of price
                    public  sortprice(p):any {                        //method parameter
                      this.cryptoservice.sortprice(p).subscribe(     //using service to sort price
                        data =>{
                          this.alldata = [];                              //alldata
                          this.datarray=[];                               //alldata
                          for(let dts in data.data)                       //get from data using iteration
                          {
                            this.alldata.push(data.data[dts]);            //push data
                          }
                  
      //comparision
      function compare(a,b) {                                //method with two parameter
        if (a.quotes.USD.price > b.quotes.USD.price )         //check condition 
          return -1;
        if (a.quotes.USD.price  < b.quotes.USD.price )
         return 1;
        return 0;
     }

     this.alldata.sort(compare);              

      for(let y in this.alldata)
        {
            if(this.alldata[y].quotes.USD.price <= p)
            {
              this.datarray.push(this.alldata[y]);

            }          
        }
      
    },
    error=>{
      console.log("Error");
      console.log(error.status);     
    }    
  )
}

//navigate to price chart with id e.g pc=1
public viewPriceChart(view) {
  this.toastr.info("Price Chart View ");                               //msg
  this.router.navigate(['/pricechart'],{ queryParams: {pc:view} });   //we pass pc=id e.g pc=1
}

public gocomparelist() {
  //passing url across route using queryParams
  this.router.navigate(['/comparison'],{ queryParams: {c1:this.ob2[0].id,c2:this.ob2[1].id } });

}

public check(e,val) {
  if(e.checked===true){
    this.count++;
    for(let dm in this.datarray){                           //get using iteration
      if(this.datarray[dm].id==val){                        //e.g id 1 == 1 we check 
        console.log(this.datarray[dm].id);                  
        console.log(val)                                       
         console.log (this.ob1.push(this.datarray[dm]));         // it tells how many boxes checked
      } 

    }
  }
  if(e.checked===false){
    this.count--;
    for(let del in this.ob1){                    //get id
      if(this.ob1[del].id==val){                  //check
       console.log(this.ob1);
       console.log(this.ob1[del].id)
        this.ob1.splice(del,1);                   //remove or add
      }
      
    }
  }
  if(this.ob1.length==2){                    //answer is 2 just check length we got length=2
        this.count=2;
        this.ob2 = this.ob1;                //get data according to selection
  }
  console.log(this.ob1);
  console.log(this.ob2);
}

//sort and select market value between some numbers
public sortMarketCap(marketData):any {
  this.cryptoservice.sortmarketcap(marketData).subscribe(         //get data from service through url 
    data =>{
      this.alldata = [];                                          //this have all the data of cryptocurrency
      this.datarray=[];                                             //same as above i am using to differ for easy way
      console.log(this.alldata);
      for(let dt in data.data)
      {
        this.alldata.push(data.data[dt]);                     //push all data in this
       
      }


      function compare(a,b) {
        if (a.quotes.USD.market_cap > b.quotes.USD.market_cap )
          return -1;
        if (a.quotes.USD.market_cap < b.quotes.USD.market_cap )
        return 1;
        return 0;
      }
      this.alldata.sort(compare);
     
      for(let x in this.alldata)
      {
        if(this.alldata[x].quotes.USD.market_cap <= marketData)
        {
          this.datarray.push(this.alldata[x]); 
        }
      }
    },
error=>{
  console.log("Error");
  console.log(error.status);
      
}

)
}



 ngOnInit() {
  
    this.currencyList();
    
   

  }

}
