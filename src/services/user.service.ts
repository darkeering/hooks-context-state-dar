import { Subject } from "rxjs/internal/Subject";

export class UserService {
  name = "admin";
  age: number = 18;
  age$ = new Subject<number>();

  setAge(age: number) {
    this.age = age;
    this.age$.next(this.age);
  }
}
