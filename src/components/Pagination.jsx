const Pagination = ({ currentPage, totalPages, onPageChange }) => {
      const pageNumbers = [];
      const maxVisiblePages = 5;
      let startPage, endPage;
    
      if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
      } else {
        const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
        const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
        
        if (currentPage <= maxPagesBeforeCurrent) {
          startPage = 1;
          endPage = maxVisiblePages;
        } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
          startPage = totalPages - maxVisiblePages + 1;
          endPage = totalPages;
        } else {
          startPage = currentPage - maxPagesBeforeCurrent;
          endPage = currentPage + maxPagesAfterCurrent;
        }
      }
    
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    
      return (
        <div className="flex items-center justify-between mt-8">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  &larr;
                </button>
                
                {startPage > 1 && (
                  <>
                    <button
                      onClick={() => onPageChange(1)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${1 === currentPage ? 'text-pink-600 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      1
                    </button>
                    {startPage > 2 && (
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                    )}
                  </>
                )}
                
                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${number === currentPage ? 'text-pink-600 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {number}
                  </button>
                ))}
                
                {endPage < totalPages && (
                  <>
                    {endPage < totalPages - 1 && (
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => onPageChange(totalPages)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${totalPages === currentPage ? 'text-pink-600 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  &rarr;
                </button>
              </nav>
            </div>
          </div>
        </div>
      );
    };
    
    export default Pagination;