import { useEffect, useState } from "react";
import { Row, Col, Pagination, Container } from "react-bootstrap";
import { FaCheck, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

export default function TasksTable({ filters }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setData(res.data.sort((a, b) => a.id - b.id)))
      .catch((err) => console.error(err));
  }, []);

  const filteredData = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCompleted = filters.completed === null ? true : item.completed === filters.completed;
    const matchesUser = filters.selectedUsers.length === 0 ? true : filters.selectedUsers.includes(item.userId);
    return matchesSearch && matchesCompleted && matchesUser;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const renderPagination = () => {
    const items = [];

    const sidePages = window.innerWidth <= 425 ? 0 : 1;

    items.push(
      <Pagination.Item key={1} active={page === 1} onClick={() => setPage(1)}>
        1
      </Pagination.Item>
    );

    let startPage = page - sidePages;
    let endPage = page + sidePages;

    if (startPage < 2) {
      startPage = 2;
      endPage = startPage + 2 * sidePages;
    }
    if (endPage > totalPages - 1) {
      endPage = totalPages - 1;
      startPage = Math.max(2, endPage - 2 * sidePages);
    }

    if (startPage > 2) items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item key={i} active={page === i} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages - 1) items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);

    if (totalPages > 1)
      items.push(
        <Pagination.Item key={totalPages} active={page === totalPages} onClick={() => setPage(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );

    return items;
  };

  return (
    <div className="p-3 bg-custom">
      <Container className="px-5" fluid="sm">
        <Row className="border-bottom fw-bold text-dark-blue py-2 title">
          <Col xs={2}>
            <h5 className="fw-bold responsive-label"></h5>
          </Col>
          <Col xs={7} sm={8}>
            <h5 className="fw-bold">TITLE</h5>
          </Col>
          <Col xs={2}>
            <h5 className="fw-bold text-end completed-label"></h5>
          </Col>
        </Row>

        {currentPageData.map((row) => (
          <Row
            key={row.id}
            className="custom-border-bottom border-info border-solid py-2 align-items-center bg-light my-3 py-4"
          >
            <Col xs={1} className="text-end">
              {row.userId}
            </Col>
            <Col xs={1}></Col>
            <Col className="task-title">{row.title}</Col>
            <Col xs={2} className="text-center">
              {row.completed ? <FaCheck className="text-info" /> : <FaTimes className="text-info" />}
            </Col>
          </Row>
        ))}

        <div className="d-flex justify-content-center mt-5">
          <div className="d-flex justify-content-center mt-5">
            <Pagination className="custom-circle-pagination">
              <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)}>
                <FaChevronLeft className="arrow-icon" />
              </Pagination.Prev>

              {renderPagination()}

              <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                <FaChevronRight className="arrow-icon" />
              </Pagination.Next>
            </Pagination>
          </div>
        </div>
      </Container>
    </div>
  );
}
