import getCurrentuser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({ children }: {
    children: React.ReactNode;
}) {

    const currrentUser= await getCurrentuser();
    return (
        <div className="h-full">
            <DesktopSidebar currentUser={currrentUser!} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar