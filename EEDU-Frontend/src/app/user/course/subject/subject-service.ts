import { Injectable } from '@angular/core';
import {EntityService} from '../../../entity/entity-service';
import {GenericSubject, SubjectModel} from './subject-model';
import {SubjectCreateModel} from './subject-create-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends EntityService<string, SubjectModel, GenericSubject, SubjectCreateModel> {

    private constructor(http: HttpClient) {
        super(http, 'course/subject', {
            create: "SUBJECT_CREATE", delete: "SUBJECT_DELETE", fetch: "SUBJECT_GET"
        });
    }

    protected toModel(data: GenericSubject): SubjectModel {
        return SubjectModel.fromObject(data);
    }

}
