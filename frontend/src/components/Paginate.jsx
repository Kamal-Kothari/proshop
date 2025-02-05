import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import React from 'react'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map(x => (
                    <LinkContainer to={
                        !isAdmin ? (
                            keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
                        ) : (`/admin/productList/${x + 1}`)
                    } key={x + 1}>
                        <Pagination.Item disabled={x + 1 === page} active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate