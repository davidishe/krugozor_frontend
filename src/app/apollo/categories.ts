import { gql } from "apollo-angular";

const CATEGORIES_QUERY = gql`
  query Categories {
    proposalTypes(pagination: { page: 1, pageSize: 50 }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export default CATEGORIES_QUERY;