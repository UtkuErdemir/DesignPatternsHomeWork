import XHRequestBuilder from './xhrequest-builder';
import {Request} from './request';
export default class XHRequest implements Request{
  private readonly xhr: XMLHttpRequest;
  private readonly obj: FormData = null;
  constructor(xhr, obj?){
    this.xhr = xhr;
    if (obj) {
      this.obj = obj;
    }
  }
  static newBuilder(baseUrl, path){
    return new XHRequestBuilder(baseUrl, path);
  }
  getXHR(): XMLHttpRequest{
    return this.xhr;
  }
  async request(){
    this.getXHR().send(this.obj);
    return this.xhr.responseText;
  }
}
