export default class Dwelling {
    _id = undefined;
    siocId = undefined;
    publicationType = '';
    address = {};
    type = '';
    subtype = '';
    currency = '';
    price = '';
    occupationStatus= '';
    spaces = {};
    features = {};
    services = {};
    legal = {};
    images = [];
    generalDescription= '';
    privateDescription= '';
    agency = '';
    constructor(obj) {
        Object.assign(this, obj);
    }
}