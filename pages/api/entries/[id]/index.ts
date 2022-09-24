import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = 
| { message: string }
| IEntry
| null

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'PUT':
            return updateEntry( req, res )

        case 'GET':
            return getEntry( req, res )
            
        default:
            return res.status(400).json({ message: 'Método no existe' })
    }

}

const getEntry = async ( req: NextApiRequest, res: NextApiResponse ) => {
    const { id } = req.query

    await db.connect()

    const entryToGet = await Entry.findById( id )

    await db.disconnect();

    if ( !entryToGet ) {
        return res.status(400).json({ message: "No hay entrada con ese ID: " + id })
    }

    return res.status(200).json( entryToGet )
}

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse ) => {

    const { id } = req.query 

    await db.connect();

    const entryToUpdate = await Entry.findById( id )

    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: "No hay entrada con ese ID: " + id })
    }

    const { //Esto lo que hace es que si recibe la informacion utilizamos la que nos mandan, si no utilizamos la que ya tenia
        description = entryToUpdate.description,
        status = entryToUpdate.status,
     } = req.body

     try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true } )
        await db.disconnect();
        res.status(200).json( updatedEntry! )
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message })
    }

     //runValidators revisa que el estado sea uno de los estados permitidos en nuestra enumeracion, y el "new: true", para que devuelva la informacion actualizada
    
     /*
     Otra manera de hacer lo de la linea 47

      entryToUpdate.description = description;
      entryToUpdate.status = status;
      await entryToUpdate.save()
      */


}