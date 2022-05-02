import React from 'react'
import ReactPaginate from "react-paginate"
import {
    useParams,
    useLocation,
    useHistory,
    useRouteMatch,
    useNavigate
  } from "react-router-dom";
const Pagination = ({marginPages,pageRange,initialPage,pageCount}) => {
  const params = useParams()
  const location = useLocation();
  const navigate = useNavigate();
    const handlePagination = id => {
        const path = location.pathname
        const query = params
        query.id = id.selected + 1
        // router.push({
        //   pathname: path,
        //   query: query,
        // })
        navigate(`/meeting/${params.meetingID}/${query.id}`)
      }
    return (
        
        <ReactPaginate
            marginPagesDisplayed={marginPages}
            pageRangeDisplayed={pageRange}
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            initialPage={initialPage}
            forcePage={initialPage}
            pageCount={pageCount}
            onPageChange={handlePagination}
            containerClassName={"paginate-wrap"}
            subContainerClassName={"paginate-inner"}
            pageClassName={"paginate-li"}
            pageLinkClassName={"paginate-a"}
            activeClassName={"paginate-active"}
            previousClassName={"paginate-previous"}
            nextClassName={"paginate-next"}
            breakLinkClassName={"paginate-break-a"}
            breakClassName={"paginate-previous"}
            disableInitialCallback={ true }
          />
          
    )
}

export default Pagination