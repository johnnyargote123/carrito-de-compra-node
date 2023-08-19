export default class Customerror {
    static generateCustomError = function({name, message, cause}) {
        const customerror = new Error(message, {cause})
        customerror.name = name
        throw customerror
    }
}