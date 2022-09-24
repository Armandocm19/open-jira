import { FC, useEffect, useReducer } from 'react'
import { Entry } from '../../interfaces'
import {  EntriesContext,  EntriesReducer } from './'
import entriesApi from '../../apis/entriesApi';

import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[]
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const  Entries_INITIAL_STATE:  EntriesState = {
    entries: []
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( EntriesReducer,  Entries_INITIAL_STATE)
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async ( description: string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description })

        dispatch({ type: '[Entry] Add-Entry', payload: data })

    }

    const onEntryUpdated = async ( { _id, description, status }: Entry, showNackbar: boolean = false ) => {
        try {
            const { data } = await entriesApi.put<Entry>( `/entries/${_id}`, { description, status })
            dispatch({ type: '[Entry] Update-Entry', payload: data })

            //TODO: mostrar snackbar
            if ( showNackbar ){
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }


        } catch (error) {
            console.log({ error })
        }
    }

    const refreshEntries = async () => {
        
        try {
            const { data } = await entriesApi.get<Entry[]>('/entries')
            dispatch({ type: '[Entry] Refresh-Entry', payload: data });
        } catch (error) {
            console.log(error)
        }

    }

    const onDeleteEntry = async ( entry: Entry ) => {
        
        dispatch({ type: '[Entry] Delete-Entry', payload: entry });

    }

    useEffect(() => {
        refreshEntries()
    }, [])
    

    return (
       < EntriesContext.Provider value={{
           ...state,

           //Metodos
           addNewEntry,
           onEntryUpdated,
           onDeleteEntry,
           refreshEntries
      }}>
          { children }
        </ EntriesContext.Provider>
    )
}