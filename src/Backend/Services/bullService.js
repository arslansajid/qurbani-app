
import { db } from '../firebase';
import { Bull } from '../Models/bull';

export const getBulls = async function () {
    const query = await db.collection('bulls').limit(20).get();

    let bulls = [];

    query.docs.forEach((doc) => {
        const bull = Bull.fromFirestore(doc);
        if (bull) {
            bulls.push(bull);
        }
    });
    console.log('Bulls', bulls);

    return bulls;
};

export const addBull = async function (data) {
    console.log(data)
    await db.collection('bulls').add(data);
};

export const deleteBull = async function (id) {
    await db.collection('bulls').doc(id).delete();
};

export const updateBull = async function (id, data) {
    await db.collection('bulls').doc(id).set(data, { merge: true });
};

export const getBullById = async function (id) {
    const query = await db.collection('bulls').doc(id).get();
    return Bull.fromFirestore(query);
};