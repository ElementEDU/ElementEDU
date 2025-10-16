import { Injectable } from '@angular/core';
import {EntityService} from '../../../entity/entity-service';
import {GenericRoom, RoomModel} from './room-model';
import {RoomCreateModel} from './room-create-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends EntityService<string, RoomModel, GenericRoom, RoomCreateModel>{

    private constructor(http: HttpClient) {
        super(http, 'course/room', { create: "ROOM_CREATE", delete: "ROOM_DELETE", fetch: "ROOM_GET" });
    }

    protected toModel(data: GenericRoom): RoomModel {
        return RoomModel.fromObject(data);
    }

}
