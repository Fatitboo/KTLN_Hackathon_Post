import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
const PaginationButtons = ({ setCurrentPage, currentPage, totalPages }) => {
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };
  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        className="list-none flex items-center"
        nextLabel={
          showNextButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-sm list-none">
              <BsChevronRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={Math.ceil(totalPages)}
        previousLabel={
          showPrevButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-sm mr-4 list-none">
              <BsChevronLeft />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center list-none justify-center rounded-sm mr-4"
        activeClassName="bg-blue-600 text-white"
      />
    </motion.div>
  );
};

export default PaginationButtons;
