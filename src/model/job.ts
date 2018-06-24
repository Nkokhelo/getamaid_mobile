export interface Job
{
    key?:string;
    parent_id:string;
    maid_id:string;
    duration:number;
    duration_type:string;
    description:string;
    job_cost:number;
}