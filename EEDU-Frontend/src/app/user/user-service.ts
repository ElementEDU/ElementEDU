import { Injectable } from '@angular/core';
import {EntityService} from '../entity/entity-service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityService<any, any, any>{

}
