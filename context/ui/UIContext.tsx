import { createContext } from 'react';

interface ContextProps {
     sidemenuOpen: boolean;
     isAdding: boolean;
     isDragging: boolean;

     //Metodos
     openSideMenu: () => void;
     closeSideMenu: () => void;
     setAddingContext: (isAdding: boolean) => void
     startDraggin: () => void
     endDraggin: () => void
}

export const UIContext = createContext({} as ContextProps)