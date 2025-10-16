import { Injectable } from '@angular/core';
import {EntityService} from '../../../entity/entity-service';
import {GenericPrivilege, PrivilegeModel} from './privilege-model';
import {PrivilegeCreateModel} from './privilege-create-model';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService extends EntityService<string, PrivilegeModel, GenericPrivilege, PrivilegeCreateModel>{

    protected toModel(data: GenericPrivilege): PrivilegeModel {
        return PrivilegeModel.fromObject(data);
    }

}
