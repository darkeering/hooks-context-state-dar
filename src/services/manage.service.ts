import { Subject } from "rxjs"

export class ManageService {
  manageId:number = 1
  manageId$ = new Subject<number>()

  setManageId(id: number) {
    this.manageId = id
    this.manageId$.next(this.manageId)
  }
}
