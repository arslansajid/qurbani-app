export class User {

    constructor(x) {
        this.uuid = x.uuid;
        this.name = x.name;
        this.email = x.email;
        this.city = x.city;
        this.userName = x.userName;
        this.isActive = x.isActive;
        this.phone = x.phone;
        this.address = x.address;
        this.timestampRegister = x.timestampRegister;
        this.profileImage = x.profileImage;
    }

    static fromFirestore(doc) {
        const data = doc.data();

        if (!data) return null;

        return new User({
            uuid: doc.id,
            name: data['name'] ? data['name'] : '',
            email: data['email'] ? data['email'] : '',
            city: data['city'] ? data['city'] : '',
            userName: data['userName'] ? data['userName'] : '',
            isActive: data['isActive'] ? data['isActive'] : false,
            phone: data['phone'] ? data['phone'] : '',
            address: data['address'] ? data['address'] : '',
            timestampRegister: data['timestampRegister'] ? data['timestampRegister'] : '',
            profileImage: data['profileImage'] ? data['profileImage'] : '',
        });
    }

    toJson(x) {
        return {
            uuid: x.uuid,
            name: x.name,
            email: x.email,
            city: x.city,
            userName: x.userName,
            isActive: x.isActive,
            phone: x.phone,
            address: x.address,
            timestampRegister: x.timestampRegister,
            profileImage: x.profileImage,
        };
    }
}