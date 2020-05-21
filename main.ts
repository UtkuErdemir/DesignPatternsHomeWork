import BaseConnection from './base-connection';
import FetchRequest from './fetch-request';
import XHRequest from './xhrequest';
import {Context} from './context';
import {XHRAdapter} from './xhradapter';

export class Main{
  title = 'DesignPatternHomework';

  constructor() {
    const connector = BaseConnection.newBuilder("213.14.182.224").addPort("8090").build();
    const xhrreq = new Context(XHRequest.newBuilder(connector.getUrl(), "mynotifications")
      .get()
      .addBody(["userId"], ["adssa"])
      .addHeaders("Content-Type", "application/json")
      .build());
    xhrreq.request().then((response) => {
      console.log(connector.getUrl()+" adresi üzerine XHRequest biçiminde istek atılıyor.");
      console.log("----------------------------------------------------------------------");
      console.log(response);
      console.log("----------------------------------------------------------------------");
    });
    const fetchReq = FetchRequest.newBuilder(connector.getUrl(),"mynotifications")
      .post()
      .addMultipleBody(["userId"],["adeneme"])
      .build();
    fetchReq.request().then((resp)=>{
      console.log(connector.getUrl()+" adresi üzerine FetchRequest biçiminde istek atılıyor.");
      console.log("----------------------------------------------------------------------");
      console.log(resp);
      console.log("----------------------------------------------------------------------");
    });
    const xhradapter= new XHRAdapter(FetchRequest.newBuilder(connector.getUrl(), "mynotifications")
      .post()
      .addBody(["userId"], ["adssa"])
      .build()).build();
    xhradapter.request().then((resp)=>{
      console.log(connector.getUrl()+" adresi üzerine XHRAdapter biçiminde istek atılıyor.");
      console.log("----------------------------------------------------------------------");
      console.log(resp);
    });
  }

}
