/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTemplate = /* GraphQL */ `
  query GetTemplate($id: ID!) {
    getTemplate(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listTemplates = /* GraphQL */ `
  query ListTemplates(
    $filter: ModelTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
