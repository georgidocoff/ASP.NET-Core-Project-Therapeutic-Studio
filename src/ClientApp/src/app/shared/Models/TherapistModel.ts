export class TherapistModel implements ITherapistModel{
    id?:number;
    firstName: string;
    middleName: string;
    lastName: string;
    positionType: number;
    roleType: number;
    fullName?:string;
}