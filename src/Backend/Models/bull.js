
export class Bull {
    constructor(x) {
        this.uuid = x.uuid;
        this.color = x.color;
        this.image = x.image;
        this.contact = x.contact;
        this.description = x.description;
        this.location = x.location;
        this.gender = x.gender;
        this.price = x.price;
        this.weight = x.weight;
        this.weightUnit = x.weightUnit;
        this.timestampAdded = x.timestampAdded;
    }

    static fromFirestore(doc) {
        const data = doc.data();

        if (!data) return null;

        return new Bull({
            uuid: doc.id,
            color: data['color'] ? data['color'] : '',
            image: data['image'] ? data['image'] : [],
            contact: data['contact'] ? data['contact'] : [],
            description: data['description'] ? data['description'] : [],
            location: data['location'] ? data['location'] : [],
            gender: data['gender'] ? data['gender'] : [],
            price: data['price'] ? data['price'] : [],
            weight: data['weight'] ? data['weight'] : [],
            weightUnit: data['weightUnit'] ? data['weightUnit'] : '',
            timestampAdded: new Date(),
        });
    }

    toJson(x) {
        return {
            uuid: x.uuid,
            color: x.color,
            image: x.image,
            contact: x.contact,
            description: x.description,
            location: x.location,
            gender: x.gender,
            price: x.price,
            weight: x.weight,
            timestampAdded: x.timestampAdded,
            weightUnit: x.weightUnit,
        };
    }
}