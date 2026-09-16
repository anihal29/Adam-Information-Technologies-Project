import { useState } from "react";
import { Badge, Button, Card, Table } from "react-bootstrap";
import "./VendorCard.css"

function VendorCard(props) {

  // Basic Display of a card
  let name = props.name;
  let category = props.category;
  let entryPricing = props.entryPricing;
  let enterprisePricing = props.enterprisePricing;
  let features = props.features;
  let security = props.security;
  let targetBusinessSize = props.targetBusinessSize;

  // State variable for our full research
  const [showResearch, setShowResearch] = useState(false);

  // Display or hide the rest of the vendor research
  function handleResearch() {
    setShowResearch(research => !research);
  }

  return (
    <Card className="vendor-card h-100">
      <Card.Body className="d-flex flex-column">
        <div className="vendor-title-row">
          <div>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
            {props.technologyType ? <p className="small mb-1"><strong>{props.technologyType}</strong></p> : <></>}
          </div>
          {props.recommendation ? <Badge bg="success">{props.recommendation}</Badge> : <></>}
        </div>

        {props.description ? <Card.Text>{props.description}</Card.Text> : <></>}

        <Card.Text><strong>Entry &amp; Pro Pricing:</strong> {entryPricing}</Card.Text>
        <Card.Text><strong>Enterprise Pricing:</strong> {enterprisePricing}</Card.Text>
        <Card.Text><strong>Security Standards &amp; Compliance:</strong> {security}</Card.Text>
        <Card.Text><strong>Target Business Size:</strong> {targetBusinessSize}</Card.Text>

        <strong>Core Features:</strong>
        <ul>
          {features.map((f, index) => <li key={index}>{f}</li>)}
        </ul>

        <Button variant="dark" className="mt-auto" onClick={handleResearch}>
          {showResearch ? "Hide Full Research" : "Show Full Research"}
        </Button>

        {/* IF full research is selected, display the additional information from our Google Doc */}
        {showResearch ?
          <div className="vendor-details">
            <hr/>

            {props.easeOfLearning ? <p><strong>Ease of Learning:</strong> {props.easeOfLearning}</p> : <></>}
            {props.software ? <p><strong>Software:</strong> {props.software}</p> : <></>}
            {props.securityScore ? <p><strong>Security Standards Ranking:</strong> {props.securityScore}</p> : <></>}
            {props.whySize ? <p><strong>Why this Size:</strong> {props.whySize}</p> : <></>}

            {props.pros ?
              <div>
                <strong>Pros:</strong>
                <ul>{props.pros.map((p, index) => <li key={index}>{p}</li>)}</ul>
              </div> : <></>}

            {props.cons ?
              <div>
                <strong>Cons:</strong>
                <ul>{props.cons.map((c, index) => <li key={index}>{c}</li>)}</ul>
              </div> : <></>}

            {/* The AI section of the Google Doc contains four separate rankings */}
            {props.featureRank ?
              <Table bordered size="sm" className="rank-table">
                <tbody>
                  <tr><th>Core Features Rank</th><td>{props.featureRank}</td></tr>
                  <tr><th>Pricing Rank</th><td>{props.pricingRank}</td></tr>
                  <tr><th>Security &amp; Enterprise Governance Rank</th><td>{props.securityRank}</td></tr>
                  <tr><th>Target Business Size Rank</th><td>{props.businessSizeRank}</td></tr>
                </tbody>
              </Table> : <></>}

            {!props.featureRank && props.securityRank ? <p><strong>Security Rank:</strong> {props.securityRank}</p> : <></>}
          </div>
          : <></>}
      </Card.Body>
    </Card>
  )
}

export default VendorCard;