import { useState, createContext, useContext } from 'react';

// Crear un contexto para las pestañas
const TabsContext = createContext();

const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Proveer el contexto a los componentes hijos
  const value = { activeTab, setActiveTab };

  return (
    <TabsContext.Provider value={value}>
      <div className={`${className} rounded-xl border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark `}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children }) => {
  return <div className="mb-7.5 flex flex-wrap gap-3 rounded-lg border border-stroke py-3 px-4 dark:border-strokedark">{children}</div>;
};

const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const baseClasses = "rounded-md py-3 px-4 text-sm font-medium md:text-base lg:px-6";
  const activeClasses = "bg-primary text-white hover:bg-primary hover:text-white dark:hover:bg-primary";
  const inactiveClasses = "bg-gray dark:bg-meta-4 text-black dark:text-white hover:bg-primary hover:text-white dark:hover:bg-primary";

  // Combinar las clases pasadas como prop con las clases base y condicionales
  const triggerClasses = `${baseClasses} ${activeTab === value ? activeClasses : inactiveClasses} ${className}`;

  return (
    <button
      className={triggerClasses}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value }) => {
  const { activeTab } = useContext(TabsContext);

  return (
    <div className={`leading-relaxed ${activeTab === value ? 'block' : 'hidden'}`}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
