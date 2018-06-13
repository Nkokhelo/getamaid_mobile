export interface Job
{
    key?:string;
    parent_id:string;
    maid_id:string;
    description:string;
    duration:number;
    duration_type:string;
    job_cost:number;
}