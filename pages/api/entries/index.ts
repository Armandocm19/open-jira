
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch ( req.method ) {
        case 'GET':
                return getEntries( res );
        
        case 'POST':
                return postEntry( req, res ) //Pido al req porque ahí viene el body de la peticion, porque usualmente el "Post" viene con data
                //el registro que quiero insertar y cierta informacion que necesito en la request
                //Y la response es la respuesta que tengo proporcionar al cliente o a la persona que me esté haciendo la solicitud
        
        case 'DELETE':
            return deleteEntry(req, res);

        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }
}

const getEntries = async ( res: NextApiResponse<Data> ) => {

    await db.connect()

    const entries = await Entry.find().sort({ createAt: 'ascending' }) //Ordena la data por el "createAt" de manera ascendente

    await db.disconnect()

    return res.status(200).json( entries )

}

const postEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { description = '' } = req.body

    const newEntry = new Entry( {
        description,
        createdAt: Date.now(),
    } ) //No pongo el "req.body" directamente, ya que el moodelo puede sobrescribir los campos con sus datos por defectos

    try { //trycatch porque pueden haber errores, ya sea del servidor, o el usuario ingrese datos equivocados
        
        await db.connect()
        await newEntry.save()
        await db.disconnect

        return res.status(201).json( newEntry ) //201 porque va a ser creado

    } catch (error) {
        await db.disconnect()
        console.log(error)

        return res.status(500).json({ message: 'Algo salió mal, revisar consola del servidor' })
    }

}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id = '' } = req.body;

    try {

        await db.connect();

        await Entry.findByIdAndDelete( id );

        await db.disconnect();

        return res.status(200).json({ message: 'La tarea con el ID: '+ id + ' ha sido elimnado correctamente' });
        
    } catch (error) {
        console.log(error);
    }

}
