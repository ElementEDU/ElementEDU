import { Injectable } from '@angular/core';
import {EntityService} from '../../../entity/entity-service';
import {ClassRoomModel, GenericClassRoom} from './class-room-model';
import {ClassRoomCreateModel} from './class-room-create-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService extends EntityService<string, ClassRoomModel, GenericClassRoom, ClassRoomCreateModel>{

    private constructor(http: HttpClient) {
        super(http, 'course/classroom', {
            create: "CLASS_CREATE", delete: "CLASS_DELETE", fetch: "CLASS_GET"
        });

        // TODO add possibility to load courses by classroom
    }

    protected toModel(obj: GenericClassRoom): ClassRoomModel {
        return ClassRoomModel.fromObject(obj);
    }
}
