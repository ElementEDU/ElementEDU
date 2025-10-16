import { Injectable } from '@angular/core';
import {EntityService} from '../../../entity/entity-service';
import {GenericPrivilege, PrivilegeModel} from './privilege-model';
import {PrivilegeCreateModel} from './privilege-create-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService extends EntityService<string, PrivilegeModel, GenericPrivilege, PrivilegeCreateModel>{

    private constructor(http: HttpClient) {
        super(http, 'user/group/privilege', {
            create: "PRIVILEGE_CREATE", delete: "PRIVILEGE_DELETE", fetch: "PRIVILEGE_GET"
        });
    }

    protected toModel(data: GenericPrivilege): PrivilegeModel {
        return PrivilegeModel.fromObject(data);
    }

}
