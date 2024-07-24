import { Component, Input, Output,EventEmitter, OnChanges, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { Options } from '../../../interfaces/Options';
import { CLOSING } from '../../../../node_modules/@types/ws';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent{
      @Input() data:any
      @Input() options!:Options
      @Input() PageNumber:number = 1;
      @Output() ActionEmitter = new EventEmitter<any>()
      @Output() SelectionCounterEvent = new EventEmitter<string>()
      @Output() ItemSelected = new EventEmitter<{id:number,checked:boolean}>()
      @Input() selectionObj!:{AllSelected:boolean,Selected:Set<number>,DeSelected:Set<number>,AllSelectedDirty:boolean}
      @Output() TriggerToggle = new EventEmitter<{id:number , status:boolean}>()

    // this function is to used to return 0 to prevent returnZeroToPreventSort from sorting our array objects
      returnZeroToPreventSort(){
        return 0;
      }
      commitAction(ActionName:string,dataId:number){
        const ObjectToCommitActionOn = this.data.find((a:any)=>a.id == dataId)
        if(confirm("do you really want to commit this!")){
            this.ActionEmitter.emit({Action:ActionName,obj:{
                ...ObjectToCommitActionOn
            }})
        }
      }
    
      ToggleCheckBox(event:any,id:number){  
        
        this.ItemSelected.emit({id:id,checked:(event.target as HTMLInputElement).checked})
      }
      
      isSelected(id:number){
            if(this.selectionObj.AllSelected)
                return true;
            
            if(this.selectionObj.AllSelectedDirty  && !this.selectionObj.DeSelected.has(id) )
                return true
            if(this.selectionObj.Selected.has(id))
              return true
            
            return false


      }
      toggleChanged(event:any,id:number){
        this.TriggerToggle.emit({id:id,status:(event.target as HTMLInputElement).checked})
      }
}
