import { ChangeEvent, useContext, useState } from 'react';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, TextField } from '@mui/material'
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const { addNewEntry } = useContext( EntriesContext )
    const { isAdding, setAddingContext } = useContext( UIContext )

    //const [isAdding, setIsAdding] = useState(false)

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value )
    }

    const onSave = () => {

        if( inputValue.length === 0 ) return; //Esto hacce que si el valor es 0, no haga nada la funcion, no retorne nada

        addNewEntry( inputValue )
        setAddingContext( false )
        setTouched( false )
        setInputValue('')

    }
 
  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>

        {
            isAdding ? (
                <>
                     <TextField 
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder= 'Nueva entrada'
                        autoFocus
                        multiline
                        label='Nueva entrada'
                        helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor'}
                        error={ inputValue.length <= 0 && touched }
                        value={ inputValue }
                        onChange={ onTextFieldChange }
                        onBlur={ () => setTouched( true ) }
                    />

                    <Box display= 'flex' justifyContent='space-between'>

                        <Button
                        variant='text'
                        onClick={() => setAddingContext( false )}
                        >
                            Cancelar
                        </Button>

                        <Button
                        variant='outlined'
                        color='secondary'
                        endIcon={ <SaveOutlinedIcon /> }
                        onClick={ onSave }
                        >
                            Guardar
                        </Button>

                    </Box>
                </>
            )
            : (
                <Button
                    startIcon={ <AddCircleOutlineOutlinedIcon /> }
                    fullWidth
                    variant='outlined'
                    onClick={() => {
                        setAddingContext( true )
                        setInputValue('')
                    }}
                >
                    Agregar tarea
                </Button>
            )
        }

    </Box>
  )
}
