const identityService = require("../services/identityService");

exports.identifyContact = async (req, res) => {

    try {

        const { email, phoneNumber } = req.body;

        const contacts = await identityService.identifyContact(email, phoneNumber);

        res.status(200).json({
            contacts
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};