import mongoose, { Model } from 'mongoose';
import 'dotenv/config';

let SequenceModel: Model<IsSequence> | undefined = undefined;

interface IsSequence {
    sequence: string;
    encoding: string;
    organism: string;
}

async function connect() {
    const connectString = process.env.MONGODB_CONNECT_STRING;

    if (!connectString) {
        throw new Error("Connect string not found, is the .env file missing?");
    }
    
    try {        
        await mongoose.connect(connectString);
        console.log("Successfully connected to MongoDB using Mongoose.");
        SequenceModel = createModel();
    } catch (err) {
        console.log(err);
        throw new Error("Unable to connect to MongoDB.");
    }
}

function createModel(): Model<IsSequence> {
    const sequenceSchema = new mongoose.Schema<IsSequence>({
        sequence: {type: String, required: true},
        encoding: {type: String, required: true},
        organism: {type: String, required: true}
    });
    return mongoose.model('sequences', sequenceSchema);
}

async function createSequence(sequence: string, encoding: string, organism: string) {
    if (!SequenceModel) {
        throw new Error("Database not connected yet.");
    }
    
    return await new SequenceModel({ sequence, encoding, organism }).save();
}

export { connect, createSequence };