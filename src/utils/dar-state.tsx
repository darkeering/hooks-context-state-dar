import React, { createContext, useContext } from "react";

const SERVICE_CONTEXT = createContext(null);

export function createServiceProvider<C>(Comp: React.FC<C>, services: any) {
  return React.memo((props: any) => {
    const outerContext = useContext(SERVICE_CONTEXT);
    let providers: any = {};
    if (outerContext) providers = Object.create(outerContext);

    for (let service of services) {
      providers[service.name] = new service();
    }

    return (
      <SERVICE_CONTEXT.Provider value={providers}>
        <Comp {...props}></Comp>
      </SERVICE_CONTEXT.Provider>
    );
  });
}

export function useServiceHook<T>(service: (new () => T)): T {
  const providers: any = useContext(SERVICE_CONTEXT);
  const provider = providers[(service as any).name];
  if (provider) {
    return provider;
  } else {
    throw new Error(
      `未找到${(service as any).name}的依赖值，请在上层servcieComponent中提供对应的service`
    );
  }
}
