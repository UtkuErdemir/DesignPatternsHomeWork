import FetchRequestBuilder from './fetch-request-builder';
import {Request} from './request';
import {ObjModel} from './obj-model';
export default class FetchRequest implements Request{
  private readonly baseUrl: string;
  private readonly obj: ObjModel;
  constructor(baseUrl: string , obj: ObjModel){
    this.baseUrl = baseUrl;
    this.obj = obj;
  }
  static newBuilder(baseUrl, path){
    return new FetchRequestBuilder(baseUrl, path);
  }
  getBaseUrl(){
    return this.baseUrl;
  }
  getObj(){
    return this.obj;
  }
  async request(){
    let resp;
    await fetch(this.getBaseUrl(), this.getObj()).then((response) => {
      return response.json();
    }).then((data) => {
      resp = data;
    }).catch((err) => {
      console.log(err);
    });
    return resp;
  }
}
