import React, { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'
import { useRouter } from 'next/router'
import { dateFunction } from '../../utils'

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDraggin, endDraggin } = useContext( UIContext )
    const router = useRouter()

    const onDragStart = ( event: DragEvent ) => {
        event.dataTransfer.setData( 'text', entry._id ) //dataTranfer nos permite establecer cierto tipo de informacion

        //Modificar el estado, para indicar que estoy haciendo Drag
        startDraggin()
    }

    const onDragEnd = () => {
        //Cancelar el Drag
        endDraggin()
    }

    const onClick = () => {
        router.push(`/entries/${ entry._id }`)
    }

  return (
    <Card
        sx={{ marginBottom: 1 }}
        draggable
        onDragStart={ onDragStart }
        onDragEnd={ onDragEnd }
        onClick={ onClick }
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }} > { entry.description } </Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingLeft: 2 }}>
                <Typography variant='body2'>{ dateFunction.getFormatDistanceToNow( entry.createdAt ) }</Typography>
            </CardActions>

        </CardActionArea>
    </Card>
  )
}
