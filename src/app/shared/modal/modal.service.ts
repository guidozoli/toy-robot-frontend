import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface ModalData {
  title?: string, 
  message: string
}

@Injectable({providedIn: 'root'})
export class ModalService {
  modalVisible = new BehaviorSubject<ModalData | null>(null)

  showModal( message: string, title?: string) {
    this.modalVisible.next({title, message})
  }
  hideModal() {
    this.modalVisible.next(null)
  }
}