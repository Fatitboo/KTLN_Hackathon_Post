import React, { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarUser from "./NavbarUser";
import NavbarCor from "./NavbarCor";

function Navbar({ user }) {
  return (
    <>
      {user?.userType.includes("admin") ? (
        <NavbarAdmin />
      ) : user?.userType.includes("organizer") ? (
        <NavbarCor user={user} />
      ) : (
        <NavbarUser user={user} />
      )}
    </>
  );
}

export default Navbar;
