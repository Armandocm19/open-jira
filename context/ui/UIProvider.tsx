import { FC, useReducer } from 'react'
import {  UIContext,  UIReducer } from './'

export interface UIState {
    sidemenuOpen: boolean
    isAdding: boolean
    isDragging: boolean
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const  UI_INITIAL_STATE:  UIState = {
    sidemenuOpen: false,
    isAdding: false,
    isDragging: false
}

export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( UIReducer,  UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' })
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    const setAddingContext = ( isAdding: boolean ) => {
        dispatch({ type: 'UI - isAdding', payload: isAdding })
    }

    const startDraggin = () => {
        dispatch({ type: 'UI - Start Dragging'})
    }

    const endDraggin = () => {
        dispatch({ type: 'UI - End Dragging'})
    }

    return (
       < UIContext.Provider value={{
           ...state,

           openSideMenu,
           closeSideMenu,
           
           setAddingContext,

           startDraggin,
           endDraggin
      }}>
          { children }
        </ UIContext.Provider>
    )
}