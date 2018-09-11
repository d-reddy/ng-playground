import { Injectable } from "@angular/core";
import { ComponentCanDeactivate } from "../behaviors/component-can-deactivate";
import { CanDeactivate } from '@angular/router';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
    canDeactivate(component: ComponentCanDeactivate):boolean{
        if(!component.canDeactivate()){
            if(confirm('You have unsaved changes.')){
                return true;
            } 
            else {
                return false;
            }
        }
        else {
            return true;
        }

    }
}