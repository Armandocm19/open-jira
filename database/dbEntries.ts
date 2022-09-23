import { isValidObjectId } from "mongoose"
import { Entry, IEntry } from "../models";
import { db } from "./";


export const getEntryById = async ( id: string ): Promise<IEntry | null> => {

    if ( !isValidObjectId(id) ) return null;

    await db.connect();
    const entry = await Entry.findById( id ).lean(); //"lean" nos trae la informacion mínima para trabajar
    //Se utiliza cuando sabemos que vamos a trabajar con mucha menos informacion
    await db.disconnect()

    return JSON.parse( JSON.stringify( entry ) ) //Esto no va a funcionar

}

export const removeForId = async ( id: string ): Promise<IEntry | null> => {

    if ( !isValidObjectId(id) ) return null;

    await db.connect();
    const entry = await Entry.remove( id ); //"lean" nos trae la informacion mínima para trabajar
    //Se utiliza cuando sabemos que vamos a trabajar con mucha menos informacion
    await db.disconnect()

    return JSON.parse( JSON.stringify( entry ) ) //Esto no va a funcionar

}
