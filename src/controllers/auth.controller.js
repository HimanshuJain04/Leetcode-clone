

export const signup = async (req, res) => {
    try {

        // get data from body
        const body = await req.json();

        // fetch data from body
        const { fullName, userName, email, password } = body;

        // validation

        // if user is already exist then return

        // if not then send otp

        // return res
        return res.json(
            {
                message: "Signup successfully",
                success: true,
                data: null,
            },
            {
                status: 200
            }
        )

    } catch (error) {
        return res.json(
            {
                message: "Server failed to signup, try again later",
                success: false,
                data: null,
                error: error
            },
            {
                status: 500
            }
        )
    }
}


export const login = async (req, res) => {
    try {

    } catch (error) {

    }
}


