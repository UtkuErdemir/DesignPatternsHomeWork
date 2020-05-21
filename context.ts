import {Request} from './request';
export class Context {
  private strategy: Request;
  constructor(strategy: Request){
      this.strategy = strategy;
  }
  async request(){
    let response = "";
    await this.strategy.request().then((resp) => {
      if(resp != ""){
        response=resp;
      }
    });
    return response;
  }
}
