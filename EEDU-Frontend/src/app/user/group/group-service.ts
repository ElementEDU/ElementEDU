import { Injectable } from '@angular/core';
import {EntityService} from '../../entity/entity-service';
import {GenericGroup, GroupModel} from './group-model';
import {GroupCreateModel} from './group-create-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends EntityService<string, GroupModel, GenericGroup, GroupCreateModel> {

    private constructor(http: HttpClient) {
        super(http, 'user/group', { create: "GROUP_CREATE", delete: "GROUP_DELETE", fetch: "GROUP_GET" });
    }

    protected toModel(data: GenericGroup): GroupModel {
        return GroupModel.fromObject(data);
    }
}
