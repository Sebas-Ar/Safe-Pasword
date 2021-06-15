/* const mongoose = require('mongoose') */
import mongoose from 'mongoose'

const mongoConnect = (URI = '') => {
    mongoose.connect(
        URI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        },
        () => console.log('conectado a mongo')
    )
}

export default mongoConnect
