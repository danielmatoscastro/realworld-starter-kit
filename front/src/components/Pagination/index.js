import React from 'react';
import PropTypes from 'prop-types';

export const Pagination = ({ pages, activePage, onClick }) => (
  <nav>
    <ul className="pagination">
      {
            Array.from(Array(pages).keys()).map((_, pageMinusOne) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className="page-item" key={pageMinusOne}>
                <a
                  className={`page-link ${pageMinusOne + 1 === activePage ? 'active' : ''}`}
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onClick(pageMinusOne + 1);
                  }}
                >
                  {pageMinusOne + 1}
                </a>
              </li>
            ))
        }
    </ul>
  </nav>
);

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Pagination;
