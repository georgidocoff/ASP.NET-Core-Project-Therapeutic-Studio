import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  alerts: IAlertModel[];
  constructor() { }

  public get(type: string, object: string): IAlertModel {
    switch (type) {
      case 'create':
        return {
          type: 'success',
          msg: `Well done! You successfully ${type} ${object} .`,
          timeout: 2000
        };
      case 'update':
        return {
          type: 'success',
          msg: `Well done! You successfully ${type} ${object} .`,
          timeout: 2000
        };
        case 'delete':
        return {
          type: 'delete',
          msg: `Well done! You successfully ${type} ${object} .`,
          timeout: 2000
        };
      case 'info':
        return {
          type: 'info',
          msg: `Info! This is an information for ${object}`,
          timeout: 2000
        };
      case 'danger':
        return {
          type: 'danger',
          msg: `Danger! Better watch out for ${object}.`,
          timeout: 2000
        };
      case 'warning':
        return {
          type: 'warning',
          msg: `Warning! Better check this ${object}.`,
          timeout: 2000
        };
      default:
        throw Error('This is invalid message.')
    }
  }
}
