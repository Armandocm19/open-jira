import mongoose, { mongo } from "mongoose";

/*
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
*/

const mongooConnection = {
    isConnected: 0
}

export const connect = async () => {
    if ( mongooConnection.isConnected === 1 ){
        console.log("Ya estabamos connectados")
        return;
    }

    if ( mongoose.connections.length > 0 ) { //Esto lo hacemos para saber si hay más de una conexion ejecutandose
        mongooConnection.isConnected = mongoose.connections[0].readyState //Le damos el valor de la primera conexion con la propiedad "readyState"
    
        if ( mongooConnection.isConnected === 1 ) {
            console.log('usando conexion anterior')
        }

        await mongoose.disconnect() //Si tenemos cualquier otro estado que no sea el 1, nos desconectamos
        //Esto evita que hayan muchas conexiones simultaneas en nuestra base de datos
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    mongooConnection.isConnected = 1;
    console.log('conectado a MongoDB', process.env.MONGO_URL)
}

export const disconnect = async () => {

    if ( process.env.NODE_ENV === 'development' ) return;

    if ( mongooConnection.isConnected === 0 ) return;

    
    await mongoose.disconnect()
    mongooConnection.isConnected = 0;
    console.log('Desconectado de MongoDB')
}