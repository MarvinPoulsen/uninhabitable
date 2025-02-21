import {format} from 'date-fns';
declare var SpatialServer: any;


function isExecption(resp: SpatialServer.DSResponse): resp is SpatialServer.SPSError {
    return !!(resp as SpatialServer.SPSError).exception;
}

/**
 * @description
 */
interface Profile {
    profileName: string;
    displayName: string;
}

export interface CaseEntry {
    id?: number;
    area: number;
    address: string;
    userId: string;
    caseStatus: string;
    caseDate: Date;
    sagsId: number;
    note: string;
    completed: boolean;
}

export interface SpsUser {
    name: string;
    shortid: string;
    hasPermission: (permission: string) => boolean;
}

export interface User {
    id: number;
    user_name: string;
    abbreviation: string;
    working_time: number;
    deviations_time: number;
    standard_time: number;
    project: string;
    team: string;
    sektor: string;
    obsolete: boolean;
}

export default class SPS {
    private ses: SpatialServer.Session;

    constructor() {
        this.ses = new SpatialServer.Session();
    }

    async initialize(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, _reject) => {
            this.ses.asyncInit(async () => {
                resolve();
            });
        });
    }

    getUser(): SpatialServer.Principal {
        return this.ses.getPrincipal();
    }

    getParameter(paramName: string): string {
        return this.ses.getParam(paramName);
    }

    async getProfiles(): Promise<Profile[]> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, _reject) => {
            this.ses.createPageRequest('profileselector_get_profiles').call(null, (profileResponse) => {
                const availableProfiles: Profile[] = profileResponse.row[0].row.map((p) => {
                    return {
                        profileName: p.name,
                        displayName: p.displayname,
                    };
                });
                resolve(availableProfiles);
            });
        });
    }

    async executeOnDs(
        dsName: string,
        options?: SpatialServer.ExecutionOptions
    ): Promise<Record<string, SpatialServer.SpsTypes>[]> {
        return new Promise((resolve, reject) => {
            const opts = options ? options : { command: 'read' };
            const ds = this.ses.getDatasource(dsName);
            ds.execute(opts, (resp) => {
                if (isExecption(resp)) {
                    reject(resp);
                } else {
                    resolve(resp);
                }
            });
        });
    }

    async getowntableData(): Promise<CaseEntry[]> {
        const data = await this.executeOnDs('lk_owntable_watch', { command: 'read-all' });
        // console.log('data: ',data)
        const caseEntries: CaseEntry[] = data.map((element) => {
            return {
                id: parseInt(element.id as string),
                area: parseFloat(element.area as string),
                address: element.address as string,
                userId: element.user_id as string,
                caseStatus: element.case_status as string,
                caseDate: new Date(element.case_date as string),
                sagsId: parseInt(element.sagsid as string),
                note: element.note as string,
                completed: element.completed === 'true',
            };
        });
        return caseEntries;
    }
    async insertCase(entry: CaseEntry): Promise<void> {
        // console.log('CaseEntry: ',entry)
        // console.log('allDay: ',typeof entry.allDay)

        try {
            await this.executeOnDs('lk_owntable_editor', {
                command: 'insert-case',
                ...entry,
                caseDate: format(entry.caseDate, 'yyyy-MM-dd'),
            });
        } catch (e) {
            console.error(e.exception.message);
            throw new Error('Ny sag fejlede');
        }
    }

    async deleteCase(id: number): Promise<void> {
        this.executeOnDs('lk_owntable_editor', { command: 'delete-by-id', id });
    }

    async updateCase(entry: CaseEntry): Promise<void> {
        // console.log('CaseEntry: ',entry)
        // console.log('allDay: ',typeof entry.allDay)
        try {
            await this.executeOnDs('lk_owntable_editor', {
                command: 'update-by-id',
                ...entry,
                caseDate: format(entry.caseDate, 'yyyy-MM-dd'),
            });
        } catch (e) {
            console.error(e.exception.message);
            throw new Error('Opdatering af tabel fejlede');
        }
    }
}
