import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const  getDataFromToken = (request: NextRequest) => {

    try {

        const encodedToken = request.cookies.get('verifyToken')?.value || ''
        const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!)
        console.log(decodedToken);
        
        return decodedToken.id

    } catch (error: any) {
        throw new Error(error.message)
    }
}