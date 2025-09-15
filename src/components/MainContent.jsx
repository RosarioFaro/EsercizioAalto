import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FiltersPanel from "./FiltersPanel";
import TasksTable from "./TasksTable";

export default function MainContent() {
  const [filters, setFilters] = useState({
    search: "",
    completed: null,
    selectedUsers: [],
  });

  return (
    <Container className="my-5" fluid="md">
      <Row>
        <Col xs={12} lg={3}>
          <FiltersPanel onFilterChange={setFilters} />
        </Col>

        <Col xs={12} lg={9} className="mt-4 mt-lg-0">
          <TasksTable filters={filters} />
        </Col>
      </Row>
    </Container>
  );
}
