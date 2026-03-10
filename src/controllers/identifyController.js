exports.identifyContact = async (req, res) => {
    try {

        const { email, phoneNumber } = req.body;

        // temporary response
        res.status(200).json({
            message: "Identify endpoint working",
            email,
            phoneNumber
        });

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};