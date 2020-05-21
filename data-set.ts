import {Form} from '@angular/forms';

export default class DataSet{
  private static dataSet: DataSet = new DataSet();
  private data: FormData;
  private constructor(){

  }
  static getDataSet(clear){
    if (clear){
      DataSet.dataSet.data = new FormData();
    }
    return DataSet.dataSet;
  }
  setMultipleData(paramsNames, paramsValues){
    paramsNames.forEach((element, index) => {
      this.data.append(element, paramsValues[index]);
    });
  }
  getData(): FormData{
    return this.data;
  }
  setDirectlyDataSet(body){
    this.data = body;
  }
  setData(paramName,paramValue){
    this.data.append(paramName,paramValue);
  }
  checkHasFile() {
    let i = 0;
    for (var value of this.data.values()) {
      i++;
    }
    return i;
  }
}

