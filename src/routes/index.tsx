import { Link, Outlet } from "react-router-dom";

export default function Root() {
   return (
      <div className="root">
         <div className="sidebar">
            <nav>
                <Link to="/dashboard/administration">Administration</Link>
            </nav>
         </div>
         <div className="content">
            <Outlet />
         </div>
      </div>
   );
}
