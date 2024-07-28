import { Directive, Input, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector:'[validateSearch]',
    standalone:true
})
export class ValidateSearch{
    @Input() SearchObj!:any;
    @HostBinding('disabled') disabled = false
    @HostListener('click') click(){
                Object.values(this.SearchObj).some((val:any)=>{
                   return val.toString().match("^$")
                })
    }
}
