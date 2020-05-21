import BaseConnectionBuilder from './base-connection-builder';

export default class BaseConnection{
  private readonly url;
  constructor(url){
    this.url = url;
  }
  static newBuilder(url){
    return new BaseConnectionBuilder(url);
  }
  getUrl(){
    return this.url;
  }
}
