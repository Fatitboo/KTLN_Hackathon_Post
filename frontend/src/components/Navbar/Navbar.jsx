import React, { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarUser from "./NavbarUser";
import NavbarCor from "./NavbarCor";

function Navbar({user}) {

    return (
        <>
            {user?.userType === "admin" ? <NavbarAdmin /> : 
            user?.userType === "organizer" ? <NavbarCor user={user}/>:<NavbarUser user={user}/>  }
        </>);
}

export default Navbar;