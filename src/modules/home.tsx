import React, { useEffect, useState } from "react";
import User from "../components/user";
import { ManageService } from "../services/manage.service";
import { UserService } from "../services/user.service";
import { createServiceProvider, useServiceHook } from "../utils/dar-state";

export default createServiceProvider(Home, [ManageService, UserService]);

function Home() {
  const manageService = useServiceHook(ManageService);
  const [manageId, setmanageId] = useState(manageService.manageId);

  useEffect(() => {
    const subscription = manageService.manageId$.subscribe(manageId => {
      setmanageId(manageId)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  

  const addManageId = () => {
    manageService.setManageId(manageId + 1);
  };
  return (
    <div>
      <div>
        <span>I am manage, manageId: {manageId}</span>
        {' '}
        <button onClick={addManageId}>add manageId</button>
      </div>
      <User></User>
      <User></User>
    </div>
  );
}
