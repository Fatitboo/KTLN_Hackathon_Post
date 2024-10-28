import Swal from "sweetalert2";
export default function SwalModal({ open, children }) {
  return Swal.fire({
    title: "Registed Successfuly!",
    text: "Please login to use functions of web!",
    confirmButtonText: "Login",
    icon: "success",
    allowOutsideClick: false,
    confirmButtonColor: "#3085d6",
  });
}
