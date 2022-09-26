import React, { DragEvent, FC, useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'

import { Entry, EntryStatus } from '../../interfaces'
import { EntryCard } from './'

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css'
import { GetServerSideProps } from 'next';

interface Props {
    status: EntryStatus;
    entries: Entry[];
}

export const EntryList: FC<Props> = ({ status, entries }) => {

    const { onEntryUpdated } = useContext( EntriesContext )
    const { isDragging, endDraggin } = useContext( UIContext )

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ) , [ entries ]) 

    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault()
    }

    const onDropEntry = ( event: DragEvent<HTMLDivElement>  ) => {
        const id = event.dataTransfer.getData('text')
    
        const entry = entries.find( e => e._id === id )!; //Devuelve el entry que coincide con la entrada que recibe del evento
        entry.status = status //cambiamos el estado de la tarea que estamos haciendo drag, al estado que recibe por parámetro la card dentro del EntryLsit
        onEntryUpdated( entry )
        endDraggin() //Indicamos que ya terminamos de hacer el evento de DragAndDrop
    }

  return (
    <div
        onDrop={ onDropEntry }
        onDragOver={ allowDrop } //le indicamos que permitimos dejar caer algo sobre este div
        className={ isDragging ? styles.dragging : '' }
    >

        <Paper sx={{ height: 'calc(100vh - 250px)', 
        overflow: 'scroll', 
        backgroundColor: 'transparent',
        '&::-webkit-scrollbar': { display: 'none' },
        padding: '1px 5px'
        }}>

            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                {
                    entriesByStatus.map(entry => (
                        <EntryCard key={ entry._id } entry={ entry } />
                    ))
                }
            </List>

        </Paper>

    </div>
  )
}

