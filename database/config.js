const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        // , {
        //     useNewUrlParse: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false,
        // } No longer supported

        console.log( 'Database is running' );
    } catch (error) {
        console.log( error );  
        throw new Error( 'Connection Error' );
    }
};

module.exports = {
    dbConnection,
}