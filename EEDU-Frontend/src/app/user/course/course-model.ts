import {Model} from '../../entity/model';
import {ClassRoomModel, GenericClassRoom} from './classroom/class-room-model';
import {GenericReducedUser, ReducedUserModel} from '../reduced-user-model';
import {FrequentAppointmentModel, GenericFrequentAppointment} from './appointment/frequent/frequent-appointment-model';
import {GenericSubject, SubjectModel} from './subject/subject-model';

export interface GenericCourse {
    id: number;
    name: string;
    subject: GenericSubject;
    students: GenericReducedUser[],
    //appointmentEntries: GenericAppointmentEntry[]; // TODO
    frequentAppointments: GenericFrequentAppointment[];
    teacher?: GenericReducedUser,
    classRoom?: GenericClassRoom;
}

export class CourseModel implements Model<bigint>
{

    public constructor(
        public readonly id: bigint,
        private readonly _name: string,
        private readonly _subject: SubjectModel,
        private _students: readonly ReducedUserModel[],
        //private _appointmentEntries: readonly AppointmentEntryModel[],
        private _frequentAppointments: readonly FrequentAppointmentModel[],
        private readonly _teacher: ReducedUserModel | null,
        private readonly _classRoom: ClassRoomModel | null
    ) {}


    public static fromObject(object: GenericCourse): CourseModel {
        const course = new CourseModel(
            BigInt(object.id),
            object.name,
            SubjectModel.fromObject(object.subject),
            object.students.map((item: GenericReducedUser): ReducedUserModel => ReducedUserModel.fromObject(item)),
            // TODO add in normal appointments
            object.frequentAppointments.map((item: GenericFrequentAppointment): FrequentAppointmentModel => {
                return FrequentAppointmentModel.fromObject(item, (): CourseModel => course);
            }),
            object.teacher ? ReducedUserModel.fromObject(object.teacher) : null,
            object.classRoom ? ClassRoomModel.fromObject(object.classRoom) : null
        );
        return course;
    }

}
