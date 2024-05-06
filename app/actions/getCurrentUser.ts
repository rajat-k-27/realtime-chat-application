import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentuser= async ()=>{
    const session= await getSession();
    try {
        if(!session?.user?.email){
            return null;
        }
        const currentUser= await prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        })

        if(!currentUser){
            return null;
        }
        return currentUser;

    } catch (error) {
        return null;
        
    }
}
export default getCurrentuser;