import BaseConnection from './base-connection';

export default class BaseConnectionBuilder{
  private readonly url: string;
  private ssl = 'http';
  private portNumber: string;
  constructor(url){
    this.url = url;
  }
  addSSL(){
    this.ssl += 's';
    return this;
  }
  addPort(portNumber){
    this.portNumber = portNumber;
    return this;
  }
  build(){
    let url = this.ssl + '://' + this.url;
    if(this.portNumber){
      url += ':' + this.portNumber;
    }
    return new BaseConnection(url);
  }
}
