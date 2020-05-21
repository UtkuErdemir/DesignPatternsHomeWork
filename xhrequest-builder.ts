import XHRequest from './xhrequest';
import DataSet from './data-set';
export default class XHRequestBuilder{
private readonly baseUrl = '';
private  readonly path = '';
protected modifiedUrl = '';
protected method = '';
private headerNames = [];
private headerValues = [];
protected responseType: XMLHttpRequestResponseType;
protected dataSet = DataSet.getDataSet(true);
private xhr: XMLHttpRequest = new XMLHttpRequest();
private func: (param?: any ) => any;
private asynchronus =true;
  constructor(baseUrl, path, asynchronus?){
    this.baseUrl = baseUrl;
    this.path = path;
    if(asynchronus)
    this.asynchronus = asynchronus;
  }
  get(): XHRequestBuilder{
    this.method = 'GET';
    return this;
  }
  post(): XHRequestBuilder{
    this.method = 'POST';
    return this;
  }
  put(): XHRequestBuilder{
    this.method = 'PUT';
    return this;
  }
  setResponseType(type): XHRequestBuilder{
    this.responseType = type;
    return this;
  }
  setSpecificFunction(func): XHRequestBuilder{
      this.func = func;
      return this;
  }
  addHeaders(headerName, headerValue): XHRequestBuilder{
    this.headerNames.push(headerName);
    this.headerValues.push(headerValue);
    return this;
  }
  addBody(paramsNames, paramsValues): XHRequestBuilder{
    let link = this.baseUrl + '/' + this.path;
    if(this.method.toUpperCase() == 'GET'){
      if(paramsNames.length == paramsValues.length && (paramsNames[0]!="" && paramsNames.length!=0)){
        link += '?';
        paramsNames.forEach((element,index) => {
          link += element + '=' + paramsValues[index] + '&';
        });
        this.modifiedUrl = link;
        return this;
      }
      else if(paramsNames.length != paramsValues.length){
        throw new Error(paramsNames.length+ " " + paramsValues.length + " " +"Parametrelerin isim ve değer sayısı eşit değil.");
      }
      else{
      }
    }
  else if (this.method.toUpperCase()=="POST" || this.method.toUpperCase()=="PUT"){
      if(paramsNames.length == paramsValues.length && (paramsNames[0]!="" || paramsNames.length!=0)){
        this.dataSet.setMultipleData(paramsNames, paramsValues);
        this.modifiedUrl = link;
        return this;
      }
      else if(paramsNames.length != paramsValues.length){
        throw new Error(paramsNames.length+ " " + paramsValues.length + " " +"Parametrelerin isim ve değer sayısı eşit değil.");
      }
      else{
        throw new Error('Parametreler '+this.method+" methodunda boş bırakılamaz.");
      }
    }
    this.modifiedUrl = link;
  }
  build(): XHRequest{
    this.xhr.open(this.method, this.modifiedUrl,this.synchronus);
    if(this.responseType != ''){
      this.xhr.responseType = this.responseType;
    }
    if(this.headerNames.length > 0){
      for (var i = 0; i<this.headerNames.length ; i++){
        this.xhr.setRequestHeader(this.headerNames[i],this.headerValues[i]);
      }
    }
    if (this.func){
      this.xhr.onreadystatechange = this.func;
    }
    if(this.dataSet.checkHasFile() > 0){
      return new XHRequest(this.xhr, this.dataSet.getData());
    }
    return new XHRequest(this.xhr);
  }
}
