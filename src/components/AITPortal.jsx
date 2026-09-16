import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import VendorCard from "./VendorCard";
import FilterPanel from "./FilterPanel";
import vendors from "../data/vendors";
import "./AITPortal.css";

export default function AITPortal() {

    // State Variables for our vendors, category tabs, and search bar
    const [allVendors] = useState(vendors);
    const [category, setCategory] = useState("All Vendors");
    const [searchTerm, setSearchTerm] = useState("");

    // variables to track if filters are active + the filtered vendor list
    const [filtered, setFiltered] = useState([]);
    const [filtersActive, setFiltersActive] = useState(false);

    const categories = ["All Vendors", "Enterprise AI Platforms", "Low-Code Automation Tools", "Data Analytics & BI Platforms"];

    function handleFilter(filteredObj) {
        let toFilter = [...allVendors];

        // Check if any filters are actually applied
        const hasFilters =
            filteredObj.feature ||
            filteredObj.businessSize !== "All" ||
            filteredObj.minPrice !== null ||
            filteredObj.maxPrice !== null ||
            filteredObj.sort;

        // if a core feature was filtered
        if (filteredObj.feature) {
            toFilter = toFilter.filter((v) =>
                v.features.some((f) =>
                    f.toLowerCase().includes(filteredObj.feature.toLowerCase().trim())
                )
            );
        }

        // if a target business size was filtered
        if (filteredObj.businessSize !== "All") {
            toFilter = toFilter.filter((v) =>
                v.businessSizes.includes(filteredObj.businessSize)
            );
        }

        // if a max price was selected
        if (filteredObj.maxPrice !== null) {
            toFilter = toFilter.filter((v) =>
                v.sortPrice <= filteredObj.maxPrice
            );
        }

        // if a min price was selected
        if (filteredObj.minPrice !== null) {
            toFilter = toFilter.filter((v) =>
                v.sortPrice >= filteredObj.minPrice
            );
        }

        // if a sorting preference was selected
        if (filteredObj.sort) {
            switch(filteredObj.sort) {
                case "price-low":
                    toFilter.sort((a, b) => a.sortPrice - b.sortPrice);
                    break;

                case "price-high":
                    toFilter.sort((a, b) => b.sortPrice - a.sortPrice);
                    break;

                case "features-high":
                    toFilter.sort((a, b) => b.features.length - a.features.length);
                    break;

                case "features-low":
                    toFilter.sort((a, b) => a.features.length - b.features.length);
                    break;

                case "business-small":
                    toFilter.sort((a, b) => a.businessSizeLevel - b.businessSizeLevel);
                    break;

                case "business-large":
                    toFilter.sort((a, b) => b.businessSizeLevel - a.businessSizeLevel);
                    break;

                default:
                    break;
            }
        }

        setFiltersActive(Boolean(hasFilters));
        setFiltered(toFilter);
    }

    // Get the data to search and display
    const dataToDisplay = filtersActive ? filtered : allVendors;

    // Search logic by vendor, feature, security standard, and target business size
    const searchedVendors = dataToDisplay.filter((v) => {
        const vendorData = (
            v.name + " " +
            v.category + " " +
            (v.description || "") + " " +
            (v.technologyType || "") + " " +
            v.features.join(" ") + " " +
            v.security + " " +
            v.targetBusinessSize
        ).toLowerCase().trim();

        const searchedVendor =
            vendorData.includes(searchTerm.toLowerCase().trim());

        const categoryVendor =
            category === "All Vendors" || v.category === category;

        return searchedVendor && categoryVendor;
    });

    return <div>
        <div className="ait-header">
            <Container>
                <h1>Adam Infotech Enterprise Software Comparison Portal</h1>
            </Container>
        </div>

        <Container fluid className="portal-container">
            <Row>
                <Col xs={12}>
                    <h2>15 Enterprise Software Vendors</h2>
                    <p>
                        Compare our research across Enterprise AI Platforms, Low-Code Automation Tools, and Data Analytics & BI Platforms.
                        Each technology includes pricing, core features, security standards, and target business size from our research.
                    </p>

                </Col>
            </Row>


            {/* Dynamic category tabs */}
            <Row className="category-row">
                <Col xs={12}>
                    {categories.map((c) =>
                        <Button
                            key={c}
                            variant={category === c ? "primary" : "outline-primary"}
                            className="category-button"
                            onClick={() => setCategory(c)}
                        >
                            {c}
                        </Button>
                    )}
                </Col>
            </Row>

            <Row>
                {/* This is the filter panel on the side of the screen */}
                <Col xs={12} md={3}>
                    <FilterPanel onFilter={handleFilter}/>
                </Col>

                <Col xs={12} md={9}>

                    {/* Search form -- updates results live when typing */}
                    <Form className="search-form">
                        <Form.Group>
                            <Form.Label htmlFor="search-input">
                                <strong>Search Vendors</strong>
                            </Form.Label>

                            <Form.Control
                                id="search-input"
                                type="text"
                                placeholder="Search by vendor, feature, security standard, or business size..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                    </Form>

                    {/* Extra bit of logic/UI */}
                    {searchedVendors.length === 1 ?
                    <p>There is <strong>{searchedVendors.length}</strong> vendor matching your search</p>:
                    <p>There are <strong>{searchedVendors.length}</strong> vendors matching your search</p>}
                    {/* <p>There are <strong>{searchedVendors.length}</strong> vendor(s) matching your search.</p> */}

                    <Row className="g-3">
                        {/* For each matching vendor, display its research card */}
                        {searchedVendors.length > 0 ?
                        searchedVendors.map((v) =>
                            <Col key={v.id} xs={12} lg={4}>
                                <VendorCard {...v}/>
                            </Col>)
                            :
                        <p><strong>No vendors found!</strong></p>}
                    </Row>
                </Col>
            </Row>

        </Container>

        <div className="ait-footer">
            <p>© 2012 - 2026 Adam Information Technologies, LLC. All Rights Reserved.</p>
        </div>
    </div>
}