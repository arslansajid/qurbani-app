
import { db } from '../firebase';
import { Bull } from '../Models/bull';

//get functions

export const getAnimal = async function (animalCategory) {
    let animals = [];
    try {
        const query = await db.collection(animalCategory).get();
        query.docs.forEach((doc) => {
            const animal = Bull.fromFirestore(doc);
            if (animal) {
                animals.push(animal);
            }
        });
        console.log('animals', animals);
        return animals;
      } catch (err) {
        throw err;
      }
};

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

export const getAnimalsByCity = async function (animal, city) {
    const documentToQuery = animal.toLowerCase() + "s";
    const query = await db
        .collection(documentToQuery)
        .where('location', 'array-contains', city)
        .orderBy('weightInKG', 'asc')
        // .orderBy('price', 'asc')
        .get();

        let animals = [];

        query.docs.forEach((doc) => {
            const animal = Bull.fromFirestore(doc);
            if (animal) {
                animals.push(animal);
            }
        });

        // sort by price
        animals.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        return animals;
}

export const getAnimalsByFilter = async function (animal, city, weight, price) {
    console.log("################## getAnimalsByFilter", {weight, price})
    const weightStart = !!weight ? Number(weight.split("-")[0]) : 0
    const weightEnd = !!weight ? Number(weight.split("-")[1]) : 99999999
    const priceStart = !!price ? Number(price.split("-")[0]) : 0
    const priceEnd = !!price ? Number(price.split("-")[1]) : 99999999
    const documentToQuery = animal.toLowerCase() + "s";
    console.log("################## getAnimalsByFilter", {weightStart, weightEnd, priceStart, priceEnd})
    
    const query = await db
        .collection(documentToQuery)
        .where('location', 'array-contains', city)
        .where('weightInKG', '>=', weightStart).where('weightInKG', '<=', weightEnd)
        .orderBy('weightInKG', 'asc')
        // .orderBy('price', 'asc')
        .get();

        let animals = [];

        query.docs.forEach((doc) => {
            const animal = Bull.fromFirestore(doc);
            if (!!animal && animal.price >= priceStart && animal.price <= priceEnd) {
                animals.push(animal);
            }
        });

        // sort by price
        animals.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        return animals;
}

export const getSaands = async function () {
    const query = await db.collection('saands').limit(20).get();

    let bulls = [];

    query.docs.forEach((doc) => {
        const bull = Bull.fromFirestore(doc);
        if (bull) {
            bulls.push(bull);
        }
    });
    console.log('Saands', bulls);

    return bulls;
};

export const getCamels = async function () {
    const query = await db.collection('camels').limit(20).get();

    let bulls = [];

    query.docs.forEach((doc) => {
        const bull = Bull.fromFirestore(doc);
        if (bull) {
            bulls.push(bull);
        }
    });
    console.log('Camels', bulls);

    return bulls;
};

export const getBakras = async function () {
    const query = await db.collection('bakras').limit(20).get();

    let bulls = [];

    query.docs.forEach((doc) => {
        const bull = Bull.fromFirestore(doc);
        if (bull) {
            bulls.push(bull);
        }
    });
    console.log('Bakras', bulls);

    return bulls;
};

export const getSheeps = async function () {
    const query = await db.collection('sheeps').limit(20).get();

    let bulls = [];

    query.docs.forEach((doc) => {
        const bull = Bull.fromFirestore(doc);
        if (bull) {
            bulls.push(bull);
        }
    });
    console.log('Sheeps', bulls);

    return bulls;
};

export const getDumbas = async function () {
    const query = await db.collection('dumbas').limit(20).get();

    let bulls = [];

    query.docs.forEach((doc) => {
        const bull = Bull.fromFirestore(doc);
        if (bull) {
            bulls.push(bull);
        }
    });
    console.log('Dumbas', bulls);

    return bulls;
};


//add functions 

export const addBull = async function (data) {
    console.log(data)
    await db.collection('bulls').add(data);
};

export const addSaand = async function (data) {
    console.log(data)
    await db.collection('saands').add(data);
};

export const addCamel = async function (data) {
    console.log(data)
    await db.collection('camels').add(data);
};

export const addBakra = async function (data) {
    console.log(data)
    await db.collection('bakras').add(data);
};

export const addSheep = async function (data) {
    console.log(data)
    await db.collection('sheeps').add(data);
};

export const addDumba = async function (data) {
    console.log(data)
    await db.collection('dumbas').add(data);
};

export const getBullById = async function (id) {
    const query = await db.collection('bulls').doc(id).get();
    return Bull.fromFirestore(query);
};