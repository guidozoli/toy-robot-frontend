import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface InfoModalData {
  title?: string, 
  message?: string | Record<string, string>;
}

@Injectable({providedIn: 'root'})
export class ModalService {
  infoModalVisible = new BehaviorSubject<InfoModalData | false>(false)

  showInfoModal( message: string | Record<string, string>, title?: string) {
    this.infoModalVisible.next({title, message})
  }
  hideInfoModal() {
    this.infoModalVisible.next(false)
  }
}