import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle,HiUsers } from "react-icons/hi2";
import useConversation from "./useConversation";


const useRoutes=()=>{
    const pathname = usePathname();
    const {ConversationId}= useConversation();

    const routes = useMemo(()=>[
        {
            label:'Chat',
            href:'/conversations',
            icon: HiChat,
            active: pathname=='/conversations' || !!ConversationId
        },
        {
            label:'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname=='/users'
        },
        {
            label:'Logout',
            href:'#',
            onclick:()=> signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ],[pathname,ConversationId]);

    return routes;
}

export default useRoutes;