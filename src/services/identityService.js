const prisma = require("../database/db");

async function identifyContact(email, phoneNumber) {

    // find contacts matching email OR phone
    const contacts = await prisma.contact.findMany({
        where: {
            OR: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        }
    });

    return contacts;
}

module.exports = {
    identifyContact
};