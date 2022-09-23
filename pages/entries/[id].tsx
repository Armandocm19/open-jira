import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';

import { capitalize, Grid, CardHeader, Card, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useRouter } from 'next/router'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from "../../components/layouts"
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunction } from '../../utils';
import entriesApi from '../../apis/entriesApi';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ( { entry } ) => {

    const { onEntryUpdated, onDeleteEntry } = useContext( EntriesContext )
    const router = useRouter();

    const [InputValue, setInputValue] = useState( entry.description );
    const [status, setStatus] = useState<EntryStatus>(entry.status )
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => InputValue.length <= 0 && touched, [InputValue, touched])

    const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value )
    }

    const onStatusChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setStatus( event.target.value as EntryStatus )
    }

    const onSave = () => {
        if ( InputValue.trim().length === 0 ) return; //Si no hya espacios en blanco no retorna nada

        const updatedEntry: Entry = {
            ...entry, //modifico solo las entradas que necesito
            status,
            description: InputValue
        }

        onEntryUpdated( updatedEntry, true )
    }

    const onDelete = async ( id: string ) => {

        const dataEntry = {
            id
        }

        try {

            const { data } = await entriesApi({
                url: '/entries',
                method: 'DELETE',
                data: dataEntry,
            })

            onDeleteEntry(entry);
            router.replace('/')
            
        } catch (error) {
            console.log(error)
        }

    }

  return (
    
    <Layout title={ InputValue.substring(0, 20) + '...' }>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >

            <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader 
                        title={`Entrada: `}
                        subheader={`Creada ${ dateFunction.getFormatDistanceToNow( entry.createdAt ) }`}
                    />

                    <CardContent>
                        <TextField 
                            sx={{ marginBottom: 1 }}
                            fullWidth
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            value={ InputValue }
                            onBlur={ () => setTouched( true ) }
                            onChange={ onTextFieldChange }
                            helperText={ isNotValid && 'Ingrese un valor' }
                            error={ isNotValid }
                       />

                       <FormControl>
                           <FormLabel>Estado: </FormLabel>
                           <RadioGroup
                                row
                                value={ status }
                                onChange={ onStatusChange }
                           >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio /> }
                                            label={ capitalize(option) }
                                        />
                                    ) )
                                }
                           </RadioGroup>
                       </FormControl>

                    </CardContent>

                        <CardActions>
                            <Button
                                startIcon={ <SaveOutlinedIcon /> }
                                variant="contained"
                                fullWidth
                                sx={{ marginBottom: 1 }}
                                onClick={ onSave }
                                disabled={ InputValue.length <= 0 }
                            >
                                Save
                            </Button>
                        </CardActions>

                </Card>
            </Grid>

        </Grid>


        <Button 
            sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }}
            onClick={ () => onDelete( entry._id ) }
        >
            <DeleteOutlineOutlinedIcon />
        </Button>                   

    </Layout>

  )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id } = params as { id: string }
    
    const entry = await dbEntries.getEntryById( id )

    if ( !entry ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage
