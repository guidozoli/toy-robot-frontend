import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface InfoModalData {
  title?: string, 
  message: string
}

@Injectable({providedIn: 'root'})
export class ModalService {
  modalVisible = new BehaviorSubject<InfoModalData | null>(null)

  showModal( message: string, title?: string) {
    this.modalVisible.next({title, message})
  }
  hideModal() {
    this.modalVisible.next(null)
  }
}