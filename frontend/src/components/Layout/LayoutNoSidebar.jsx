import {Footer, Navbar} from '../index'
function LayoutNoSidebar({user, children}) {
    return ( 
        <div >
            <Navbar user={user}/>
            <div className="mt-16">{children} </div>
            <Footer/>
        </div>
     );
}

export default LayoutNoSidebar;