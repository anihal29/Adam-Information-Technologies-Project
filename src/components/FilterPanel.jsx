import { useState } from "react";
import { Accordion, Button, Card, Form } from "react-bootstrap";
import "./FilterPanel.css";

function FilterPanel({ onFilter }) {

  // State to track selected filters
  const [featureFilter, setFeatureFilter] = useState("");
  const [businessSize, setBusinessSize] = useState("All");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Build filters object
  const buildFilters = () => {
    return {
      feature: featureFilter.trim(),
      businessSize: businessSize,
      minPrice: minPriceFilter === "" ? null : Number(minPriceFilter),
      maxPrice: maxPriceFilter === "" ? null : Number(maxPriceFilter),
      sort: sortOption
    };
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    const filters = buildFilters();
    if (onFilter) {
      onFilter(filters);
    }
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFeatureFilter("");
    setBusinessSize("All");
    setMinPriceFilter("");
    setMaxPriceFilter("");
    setSortOption("");
    if (onFilter) {
      onFilter({
        feature: "",
        businessSize: "All",
        minPrice: null,
        maxPrice: null,
        sort: ""
      });
    }
  };

  return (
    <Card className="filter-panel">
      <Card.Header>
        <h2 className="mb-0 h5">Filters</h2>
      </Card.Header>
      <Card.Body>
        <Accordion defaultActiveKey="0" flush>

          {/* Core Feature Filter */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h3 className="h6 mb-0">Core Features</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group>
                  <Form.Label htmlFor="feature-filter">Feature Keyword</Form.Label>
                  <Form.Control
                    id="feature-filter"
                    type="text"
                    placeholder="e.g. RPA, visualization, AI"
                    value={featureFilter}
                    onChange={(e) => setFeatureFilter(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          {/* Target Business Size Filter */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h3 className="h6 mb-0">Target Business Size</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Form.Select value={businessSize} onChange={(e) => setBusinessSize(e.target.value)}>
                <option value="All">All Business Sizes</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                {/* <option value="Solopreneur">Solopreneur</option>
                <option value="Startup">Startup</option>
                <option value="Small">Small Business</option>
                <option value="SMB">SMB</option>
                <option value="Mid-Market">Mid-Market</option>
                <option value="Large">Large Enterprise</option>
                <option value="Any business size">Any Business Size</option> */}
              </Form.Select>
            </Accordion.Body>
          </Accordion.Item>

          {/* Price Range Filter */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h3 className="h6 mb-0">Price Range</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="min-price">Min Listed Monthly Price ($)</Form.Label>
                  <Form.Control
                    id="min-price"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={minPriceFilter}
                    onChange={(e) => setMinPriceFilter(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="max-price">Max Listed Monthly Price ($)</Form.Label>
                  <Form.Control
                    id="max-price"
                    type="number"
                    placeholder="100"
                    min="0"
                    value={maxPriceFilter}
                    onChange={(e) => setMaxPriceFilter(e.target.value)}
                  />
                </Form.Group>
                <p className="text-muted small mt-2 mb-0">For sorting/filtering, Python/R/SQL use $0; subscription tools use the lowest listed paid monthly plan from our research.</p>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          {/* Sort Options */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h3 className="h6 mb-0">Sort By</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group as="fieldset">
                  <Form.Label as="legend" className="visually-hidden">Sort By</Form.Label>
                  <Form.Check type="radio" name="sort" id="sort-price-low" label="Price: Low to High" checked={sortOption === "price-low"} onChange={() => setSortOption("price-low")}/>
                  <Form.Check type="radio" name="sort" id="sort-price-high" label="Price: High to Low" checked={sortOption === "price-high"} onChange={() => setSortOption("price-high")}/>
                  {/* <Form.Check type="radio" name="sort" id="sort-features-high" label="Core Features: Most to Least" checked={sortOption === "features-high"} onChange={() => setSortOption("features-high")}/> */}
                  {/* <Form.Check type="radio" name="sort" id="sort-features-low" label="Core Features: Least to Most" checked={sortOption === "features-low"} onChange={() => setSortOption("features-low")}/> */}
                  <Form.Check type="radio" name="sort" id="sort-business-small" label="Business Size: Small to Large" checked={sortOption === "business-small"} onChange={() => setSortOption("business-small")}/>
                  <Form.Check type="radio" name="sort" id="sort-business-large" label="Business Size: Large to Small" checked={sortOption === "business-large"} onChange={() => setSortOption("business-large")}/>
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
  

        <div className="filter-actions mt-3">
          <Button variant="primary" className="w-100 mb-2 apply-filter-button" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline-secondary" className="w-100 reset-filter-button" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FilterPanel;