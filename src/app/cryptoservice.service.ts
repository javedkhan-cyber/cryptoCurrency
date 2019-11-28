import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoserviceService {
public baseurl="https://api.coinmarketcap.com/v2/ticker/";
  constructor(private _http:HttpClient) {
    console.log("service called");
  }
  

    private handleError(err: HttpErrorResponse) {
      console.log("Handle error Http calls")
      console.log(err.message);
      console.log(err.status);
      return Observable.throw(err.message);
    }

    public getSpecific(sId):any {
      let res=this._http.get("https://api.coinmarketcap.com/v2/ticker/"+sId+"/");
      console.log(res);
      return res;
    }

    public sortmarketcap(marketData):any {
      let res=this._http.get(this.baseurl+'?sort=market_cap');
      return res;
    }

    public sortprice(p):any {
      let res=this._http.get(this.baseurl+'?sort=price');
      return res;
    }

    public currencylist():any {
      let res=this._http.get(this.baseurl+'?sort=id');
      return res;
    }

    public globaldata():any {
      let res=this._http.get("https://api.coinmarketcap.com/v2/global/");
      return res;
    }
    
}
