import React, { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { ManageService } from "../services/manage.service";
import { UserService } from "../services/user.service";
import { createServiceProvider, useServiceHook } from "../utils/dar-state";

export default createServiceProvider(User, [UserService]);

function User() {
  const manageService = useServiceHook(ManageService);
  const userService = useServiceHook(UserService);
  const [manageId, setmanageId] = useState(manageService.manageId);
  const [name, setname] = useState(userService.name);
  const [age, setage] = useState(userService.age);
  useEffect(() => {
    const subscriptions: Subscription[] = [];
    subscriptions.push(
      manageService.manageId$.subscribe((manageId) => {
        setmanageId(manageId);
      })
    );
    subscriptions.push(
      userService.age$.subscribe((age) => {
        setage(age);
      })
    );
    return () => {
      subscriptions.forEach((i) => i.unsubscribe());
    };
  }, []);

  const addAge = () => {
    userService.setAge(age + 1);
  };
  return (
    <div>
      <span>
        I am user: {name}, my age is {age}, my manager manageId is {manageId}
      </span>{" "}
      <button onClick={addAge}>add age</button>
    </div>
  );
}
