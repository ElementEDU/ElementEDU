import { Injectable } from '@angular/core';
import {EntityService} from '../../entity/entity-service';
import {GenericGroup, GroupModel} from './group-model';
import {GroupCreateModel} from './group-create-model';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends EntityService<string, GroupModel, GenericGroup, GroupCreateModel> {

    protected toModel(data: GenericGroup): GroupModel {
        return GroupModel.fromObject(data);
    }

}
