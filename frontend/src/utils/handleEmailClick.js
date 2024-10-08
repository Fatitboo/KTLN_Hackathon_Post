const handleEmailClick = (event, email,  subject='Contact for vacancy', body='My name is: ') => {
    // Ngăn chặn sự kiện mặc định để tránh chuyển đến địa chỉ mailto trực tiếp
    event.preventDefault();
   
    // Tạo đường dẫn mailto với địa chỉ email đã chọn
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Mở liên kết mailto trong một cửa sổ/ảnh mới
    window.location.href = mailtoLink;
  };

  export default handleEmailClick;