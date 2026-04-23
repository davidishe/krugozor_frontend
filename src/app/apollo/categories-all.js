import { gql } from "apollo-angular";

// https://strapi.io/blog/a-deep-dive-into-strapi-graph-ql
// https://docs.strapi.io/dev-docs/integrations/graphql

const CATEGORIES_ALL_QUERY = gql`
  query Categories {
    category1S {
      data {
        id
        attributes {
          name
          categories {
            data {
              id
              attributes {
                name
                categories {
                  data {
                    id
                    attributes {
                      name
                      categories {
                        data {
                          id
                          attributes {
                            name
                            categories {
                              data {
                                id
                                attributes {
                                  name
                                  categories {
                                    data {
                                      id
                                      attributes {
                                        name
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default CATEGORIES_ALL_QUERY;