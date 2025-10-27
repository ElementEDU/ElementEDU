import { Injectable } from '@angular/core';
import {EntityService} from '../../entity/entity-service';
import {CourseModel, GenericCourse} from './course-model';
import {CourseCreateModel} from './course-create-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends EntityService<bigint, CourseModel, GenericCourse, CourseCreateModel>{

    protected constructor(http: HttpClient) {
        super(http, 'course', {
            create: 'COURSE_CREATE',
            delete: 'COURSE_DELETE',
            fetch: 'COURSE_GET'
        });
    }

    protected toModel(data: GenericCourse): CourseModel {
        return CourseModel.fromObject(data);
    }
}
