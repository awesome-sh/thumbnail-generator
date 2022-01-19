import { useState, createContext, useMemo } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children, initialData }) => {
  const [data, setData] = useState(initialData)
  const value = useMemo(() => ({ data, setData }), [data])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};