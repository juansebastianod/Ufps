import { loginService } from "../services/authService.js";

export const login = async (req, res) => {
    const { email, password, role_id } = req.body;
    const response = await loginService(email, password, role_id);

    if (response.status === 201) {
        res.cookie('token', response.token);
    }

    res.status(response.status).json({
        message: response.message
    });
};

//Terminado
export const logout =(req,res)=>{
    try {
        res.cookie('token',"",{
            expires: new Date(0)
        })
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
 }

