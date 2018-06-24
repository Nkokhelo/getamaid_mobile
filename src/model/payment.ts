export interface Payment
{
    key?:string;
    user_id:string;
    job_id:string;
    bank_name:string;
    account_number:string;
    amount:number;
}