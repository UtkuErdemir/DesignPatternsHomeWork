import XHRequest from './xhrequest';
import FetchRequest from './fetch-request';
import XHRequestBuilder from './xhrequest-builder';
import DataSet from './data-set';

export class XHRAdapter extends XHRequestBuilder{
    private fetchRequest: FetchRequest;

    constructor(fetchRequest: FetchRequest){
      const index = fetchRequest.getBaseUrl().indexOf('/',fetchRequest.getBaseUrl().indexOf('/',fetchRequest.getBaseUrl().indexOf('/')+1)+1);
      let path = "";
      const link = fetchRequest.getBaseUrl().substring(0, index);
      if(fetchRequest.getBaseUrl().includes('?')){
        path = fetchRequest.getBaseUrl().substring(index+1, fetchRequest.getBaseUrl().indexOf('?'))
      }
      else{
        path = fetchRequest.getBaseUrl().substring(index+1, fetchRequest.getBaseUrl().length)
      }
      super(link, path, false);
      if(fetchRequest.getObj().method){
        this.method = fetchRequest.getObj().method;
      }
      this.modifiedUrl = fetchRequest.getBaseUrl();
      if(this.method == 'PUT' || this.method == 'POST'){
        this.dataSet = DataSet.getDataSet(true);
        this.dataSet.setDirectlyDataSet(fetchRequest.getObj().body);
      }
    }
}
