import FetchRequest from './fetch-request';
import DataSet from './data-set';
import {ObjModel} from './obj-model';

export default class FetchRequestBuilder{
  private readonly baseUrl = '';
  private readonly path = '';
  private modifiedUrl = '';
  private method = '';
  private mode: RequestMode;
  private cache: RequestCache;
  private credentials: RequestCredentials;
  private headers = {};
  private redirect: RequestRedirect;
  private refeerPolicy: string;
  private dataSet =  DataSet.getDataSet(true);
  constructor(baseUrl, path){
    this.baseUrl = baseUrl;
    this.path = path;
  }
  get(): FetchRequestBuilder{
    this.method = 'GET';
    return this;
  }
  post(): FetchRequestBuilder{
    this.method = 'POST';
    return this;
  }
  put(): FetchRequestBuilder{
    this.method = 'PUT';
    return this;
  }
  addMode(mode): FetchRequestBuilder{
    this.mode = mode;
    return this;
  }
  addCache(cache): FetchRequestBuilder{
    this.cache = cache;
    return this;
  }
  addCredentials(credentials): FetchRequestBuilder{
    this.credentials = credentials;
    return this;
  }
  addHeaders(headerName, headerValue): FetchRequestBuilder{
    this.headers[headerName] = headerValue;
    return this;
  }
  addRedirect(redirect): FetchRequestBuilder{
    this.redirect = redirect;
    return this;
  }
  addRefeerPolicy(refeerPolicy): FetchRequestBuilder{
    this.refeerPolicy = refeerPolicy;
    return this;
  }
  addBody(paramName, paramValue): FetchRequestBuilder{
    let link = this.baseUrl + '/' + this.path;
    this.modifiedUrl = link;
    if (this.method.toUpperCase() == 'GET'){
      if(this.modifiedUrl.includes("?")){
        this.modifiedUrl += "&" + paramName + "=" + paramValue;
      }
      else{
        this.modifiedUrl += "?" + paramName + "=" + paramValue;
      }
    }
    else if (this.method.toUpperCase()=="POST" || this.method.toUpperCase()=="PUT"){
      this.dataSet.setData(paramName, paramValue);
    }
    return this;
  }
  addMultipleBody(paramsNames, paramsValues): FetchRequestBuilder{
    let link = this.baseUrl + '/' + this.path;
    if (this.method.toUpperCase() == 'GET'){
      if (paramsNames.length == paramsValues.length && (paramsNames[0] != '' && paramsNames.length != 0)){
        link += '?';
        paramsNames.forEach((element, index) => {
          link += element + '=' + paramsValues[index] + '&';
        });
        this.modifiedUrl = link;
        return this;
      }
      else if (paramsNames.length != paramsValues.length){
        throw new Error(paramsNames.length + ' ' + paramsValues.length + ' ' + 'Parametrelerin isim ve değer sayısı eşit değil.');
      }
      else{
      }
    }
  else if (this.method.toUpperCase()=="POST" || this.method.toUpperCase()=="PUT"){
      if(paramsNames.length == paramsValues.length && (paramsNames[0] != '' || paramsNames.length != 0)){
       this.dataSet.setMultipleData(paramsNames, paramsValues);
       this.modifiedUrl = link;
       return this;
      }
      else if(paramsNames.length != paramsValues.length){
        throw new Error(paramsNames.length + ' ' + paramsValues.length + ' ' + 'Parametrelerin isim ve değer sayısı eşit değil.');
      }
      else{
        throw new Error('Parametreler ' + this.method + ' methodunda boş bırakılamaz.');
      }
    }
  }
  build(): FetchRequest{
    const obj =  new ObjModel();
    if(this.method){
      obj.method = this.method;
    }
    if(this.mode){
      obj.mode = this.mode;
    }
    if(this.cache){
      obj.cache = this.cache;
    }
    if(this.credentials){
      obj.credentials = this.credentials;
    }
    if(this.headers !== {}){
      obj.headers = this.headers;
    }
    if(this.redirect){
      obj.redirect = this.redirect;
    }
    if(this.refeerPolicy){
      obj.refeerPolicy = this.refeerPolicy;
    }
    if (this.dataSet.checkHasFile() > 0){
      obj.body = this.dataSet.getData();
    }
    return new FetchRequest(this.modifiedUrl, obj);
  }
}
