import User from "@/models/user.model"



export const verifytoken = async(req,res) =>{
    try{
        // takin data from body
        const {token, userId} = req.body;

        // validation
        if(!token || !userId){
            return res.status(400).json({
                success:false,
                message:"require token and user id"
            })
        }

        // comapring token
        const userToken = await User.findOne({token: token});


        if(!userToken){
            return res.json({
                success:false,
                message:"token invalid"
            })
        }

        await User.findOneAndUpdate(
            {isverified: true}
        )

        return res.status(200).json({
            success:true,
            message:"Account is verified"
        })


    } catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:"something went wrong while vrifying token"
        });
    }
}



