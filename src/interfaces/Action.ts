
export interface Action{
    Name:string,
    Rule:(obj:any)=>boolean
}