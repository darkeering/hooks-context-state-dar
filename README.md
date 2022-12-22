# 使用方法

1. 在全局或者需要使用 `service` 的地方使用 `createServiceProvider` 方法生成组件

   ```typescript
   export default createServiceProvider(Home, [ManageService, UserService]);

   function Home() {
     const manageService = useServiceHook(ManageService);
     const [manageId, setmanageId] = useState(manageService.manageId);

     useEffect(() => {
       const subscription = manageService.manageId$.subscribe((manageId) => {
         setmanageId(manageId);
       });
       return () => {
         subscription.unsubscribe();
       };
     }, []);

     const addManageId = () => {
       manageService.setManageId(manageId + 1);
     };
     return (
       <div>
         <div>
           <span>I am manage, manageId: {manageId}</span>{" "}
           <button onClick={addManageId}>add manageId</button>
         </div>
         <User></User>
         <User></User>
       </div>
     );
   }
   ```

2. 就可以在此执行上下文里面使用该 service 的实例

   ```typescript
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
   ```

3. 如果在子组件中又使用 **createServiceProvider** 方法创建了与父组件同名的 **service**, 那么子组件修改的数据不会影响其父组件中的 **service** 实例中数据

   ```typescript
   // Home Component
   export default createServiceProvider(Home, [ManageService, UserService]);

   function Home() {
     ...
     return (
       <div>
         <div>
           <span>I am manage, manageId: {manageId}</span>{" "}
           <button onClick={addManageId}>add manageId</button>
         </div>
         <User></User>
         <User></User>
       </div>
     );
   }


   // User Component
   export default createServiceProvider(User, [UserService]);

   function User() {
     ...
     return (
       <div>
         <span>
           I am user: {name}, my age is {age}, my manager manageId is {manageId}
         </span>{" "}
         <button onClick={addAge}>add age</button>
       </div>
     );
   }
   ```
