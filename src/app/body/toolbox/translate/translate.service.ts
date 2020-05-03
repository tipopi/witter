import {Injectable} from '@angular/core';
import {HttpUtilService} from "../../../framework/service/http-util.service";
import {Md5} from "ts-md5";
import {Trans} from 'src/app/model/trans';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private url = "http://api.fanyi.baidu.com/api/trans/vip/translate";
  private appid = '20200501000435914';
  private key = 'gkmpyoFx7wy7B5fQ8L5e';

  constructor(private service: HttpUtilService) {
  }

  postTrans(q, from, to) {
    let salt = new Date().getTime()+'';
    // let trans: Trans = {
    //   q: q,
    //   from: from,
    //   to: to,
    //   appid:this.appid,
    //   salt: salt,
    //   sign: Md5.hashStr(this.appid + q + salt + this.key)+''
    // };
    let result=this.url+'?q='+encodeURIComponent(q)+'&from='+from+'&to='+to+'&appid='+this.appid+'&salt='+salt+'&sign='+Md5.hashStr(this.appid + q + salt + this.key)+'';

    return this.service.get_3pl(result);
  }
}
