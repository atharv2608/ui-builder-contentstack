import { BuilderContext } from '@/context/BuilderContext'
import { useContext } from 'react'

function useBuilder() {
    const context =  useContext(BuilderContext);

    if(!context){
        throw new Error("useBuilder must be used within UseBuilder Provider")
    }

  return context;
}

export default useBuilder