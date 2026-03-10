const prisma = require("../database/db");

async function identifyContact(email, phoneNumber) {

    //Find all contacts matching email or phone
    const existingContacts = await prisma.contact.findMany({
        where: {
            OR: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        },
        orderBy: {
            createdAt: "asc"
        }
    });

    //If no contacts exist → create new primary
    if (existingContacts.length === 0) {

        const newContact = await prisma.contact.create({
            data: {
                email,
                phoneNumber,
                linkPrecedence: "primary"
            }
        });

        return buildResponse([newContact]);
    }

    //Find primary contact
    let primaryContact = existingContacts.find(
        c => c.linkPrecedence === "primary"
    );

    if (!primaryContact) {
        primaryContact = existingContacts[0];
    }

    //Check if new information is provided
    const emailExists = existingContacts.some(c => c.email === email);
    const phoneExists = existingContacts.some(c => c.phoneNumber === phoneNumber);

    if (!emailExists || !phoneExists) {

        await prisma.contact.create({
            data: {
                email,
                phoneNumber,
                linkedId: primaryContact.id,
                linkPrecedence: "secondary"
            }
        });

    }

    //Fetch all related contacts again
    const allContacts = await prisma.contact.findMany({
        where: {
            OR: [
                { id: primaryContact.id },
                { linkedId: primaryContact.id }
            ]
        },
        orderBy: {
            createdAt: "asc"
        }
    });

    return buildResponse(allContacts);
}

function buildResponse(contacts) {

    const primary = contacts.find(c => c.linkPrecedence === "primary");

    const emails = [...new Set(contacts.map(c => c.email).filter(Boolean))];

    const phoneNumbers = [...new Set(contacts.map(c => c.phoneNumber).filter(Boolean))];

    const secondaryContactIds = contacts
        .filter(c => c.linkPrecedence === "secondary")
        .map(c => c.id);

    return {
        contact: {
            primaryContactId: primary.id,
            emails,
            phoneNumbers,
            secondaryContactIds
        }
    };
}

module.exports = {
    identifyContact
};