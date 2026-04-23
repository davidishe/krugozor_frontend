import { gql } from "apollo-angular";

const AmenitiesQuery = gql`
  query Amenities {
    amenities(pagination: { page: 1, pageSize: 50 }) {
      data {
        id
        attributes {
          name
          icon
        }
      }
    }
  }
`;

export default AmenitiesQuery;