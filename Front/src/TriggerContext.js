import { useState, createContext, useContext } from 'react';

const TriggerContext = createContext();

function TriggerContextProvider({ children }) {
  const [trigger, setTrigger] = useState(1);

  return (
    <TriggerContext.Provider value={[trigger, setTrigger]}>
      {children}
    </TriggerContext.Provider>
  );
}

export const useTrigger = () => useContext(TriggerContext)[0];
export const useSetTrigger = () => useContext(TriggerContext)[1];

export default TriggerContextProvider;
