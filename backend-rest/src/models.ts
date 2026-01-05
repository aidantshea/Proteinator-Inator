import mongoose, { Model } from 'mongoose';
import 'dotenv/config';

interface Sequence {
    sequence: string;
    encoding: string;
    organism: string;
}

const sequenceSchema = new mongoose.Schema<Sequence>({
    sequence: {type: String, required: true},
    encoding: {type: String, required: true},
    organism: {type: String, required: true}
});

const SequenceModel = mongoose.model('sequences', sequenceSchema);

/**
 * Connects to the MongoDB Atlas Cluster with a key from the .env file
 */
async function connect() {
    const connectString = process.env.MONGODB_CONNECT_STRING;

    if (!connectString) {
        throw new Error("Connect string not found, is the .env file missing?");
    }
    
    try {        
        await mongoose.connect(connectString);
        console.log("Successfully connected to MongoDB using Mongoose.");
    } catch (err) {
        console.error(err)
        throw new Error("Unable to connect to MongoDB.");
    }
}

/**
 * Creates a new sequence document and uploads to the MongoDB database
 * @param sequence - a nucleic acid or protein sequence
 * @param encoding - indicates DNA, RNA, or Protein
 * @param organism - organism the sequence was observed in
 * @returns The created sequence document
 */
async function createSequence(sequence: string, encoding: string, organism: string) {
    return await SequenceModel.create({ sequence, encoding, organism });
}

export { connect, createSequence };