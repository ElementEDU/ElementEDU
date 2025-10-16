import {Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {Model} from './model';
import {BehaviorSubject, finalize, map, Observable, OperatorFunction, tap} from 'rxjs';
import {CreateModel} from './create-model';
import {HttpClient} from '@angular/common/http';

/**
 * EntityService is an abstract class intended to be extended for managing entities.
 * It provides methods for fetching, creating, and deleting entities with backend interactions.
 *
 * @template P The type representing the unique identifier for entities.
 * @template C The model type used for creating new entities.
 * @template E The entity type that extends the base type with an identifier of type P.
 */
@Injectable({
    providedIn: 'root'
})
export abstract class EntityService<P, C extends CreateModel, M extends Model<P>> {

    private readonly CONTEXT: { withCredentials: true } = { withCredentials: true };

    private readonly _subject: BehaviorSubject<readonly M[]> = new BehaviorSubject<readonly M[]>([]);
    private _fetched: boolean = false;

    protected constructor(
        private readonly _location: string,
        private readonly _http: HttpClient
    ) {}

    /**
     * Retrieves the full backend URL by appending the specified location path to the environment's backend base URL.
     *
     * @return {string} The complete backend URL constructed using the environment's base URL and the provided location path.
     */
    protected get location(): string {
        return `${environment.backendUrl}/${this._location}`;
    }

    /**
     * Fetches all entities from the specified location effectively.
     *
     * @return {Observable<readonly E[]>} An observable that emits an array of entities.
     */
    public get fetchAll(): Observable<readonly M[]>
    {
        return this._http.get<any>(`${this.location}/get`, this.CONTEXT).pipe(
            this.toModelOperation,
            tap((entities: readonly M[]): void => { this._subject.next(this.sort(entities)); }),
            finalize((): void => { this._fetched = true; })
        );
    }

    protected sort(input: readonly M[]): readonly M[]
    { // to be overridden by subclasses
        return input;
    }

    /**
     * Fetches an entity from the server using the provided identifier.
     *
     * @param {P} id - The identifier of the entity to fetch.
     * @return {Observable<E>} An observable containing the fetched entity.
     */
    public fetch(id: P): Observable<M>
    {
        return this._http.get<any>(`${this.location}/get/${id}`, this.CONTEXT).pipe(
            map((data: any): M => this.toModel(data))
        );
    }

    /**
     * Creates new entities on the server based on the provided model data.
     *
     * @param {C[]} model - An array of model objects of type C to be converted into packets and sent to the server.
     * @return {Observable<readonly E[]>} An observable that emits an array of created entities of type E.
     */
    public create(model: C[]): Observable<readonly M[]>
    {
        const packets: any[] = model.map((item: C): any => item.toPacket);
        return this._http.post<any>(`${this.location}/create`, packets, this.CONTEXT).pipe(
            this.toModelOperation, tap((entities: readonly M[]): void => { this.pushCreated(entities); })
        );
    }

    /**
     * Deletes the entities associated with the provided identifier(s).
     *
     * @param {P[]} id - An array of entity identifiers to be deleted.
     * @return {Observable<void>} An observable that completes when the deletion operation finishes.
     */
    public delete(id: P[]): Observable<void>
    {
        return this._http.delete(`${this.location}/delete/${id}`).pipe(map((): void => { this.postDelete(id); }));
    }

    /**
     * Transforms an array of input data into an array of entities.
     * The transformation is performed using the toEntities method.
     *
     * @return {OperatorFunction<any[], readonly E[]>} An observable transformation function that maps
     * input data to a readonly array of entities.
     */
    private get toModelOperation(): OperatorFunction<any[], readonly M[]> {
        return map((data: any): readonly M[] => this.toModels(data));
    }

    /**
     * Converts an array of data objects into an array of entities of type E.
     *
     * @param {any[]} data - The array of data objects to be converted into entities.
     * @return {readonly E[]} An array of entities of type E, created from the provided data.
     */
    protected toModels(data: any[]): readonly M[] {
        return data.map((item: any): M => this.toModel(item));
    }

    /**
     * Converts the provided data into an entity of type E.
     * This method is expected to be implemented in derived classes.
     *
     * @param {any} data - The input data to be transformed into an entity.
     * @return {E} The transformed entity of type E.
     */
    protected abstract toModel(data: any): M;

    /**
     * Retrieves the current fetched status.
     *
     * @return {boolean} Returns true if the item has been fetched, otherwise false.
     */
    public get fetched(): boolean {
        return this._fetched;
    }

    /**
     * Retrieves the current value of the subject as a read-only array.
     *
     * @return {readonly E[]} The current value of the subject.
     */
    public get value(): readonly M[] {
        return this._subject.value;
    }

    /**
     * Retrieves an observable stream of read-only elements.
     * If the data has not been fetched yet, it triggers the fetch process.
     *
     * @return {Observable<readonly E[]>} An observable that emits an array of elements.
     */
    public get value$(): Observable<readonly M[]> {
        if (!this.fetched) {
            this.fetchAll.subscribe();
        }
        return this._subject.asObservable();
    }

    /**
     * Adds the newly created items from the response to the current value and emits the updated value.
     *
     * @param {readonly E[]} response - An array of newly created items to be added.
     * @return {void} This method does not return a value.
     */
    protected pushCreated(response: readonly M[]): void {
        this._subject.next([...this.value, ...response]);
    }

    /**
     * Handles the operations to perform post-deletion of items.
     *
     * @param {readonly P[]} id - The identifiers of the items to be deleted.
     * @return {void} This method does not return a value.
     */
    protected postDelete(id: readonly P[]): void {
        const idSet = new Set(id);
        this._subject.next(this.value.filter((item: M): boolean => !idSet.has(item.id)));
    }
}
