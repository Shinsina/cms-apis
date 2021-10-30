import gql from '@cms-apis/graphql/tag';

export default gql`

extend type Query {
  contentInterfaceById(input: QueryContentInterfaceByIdInput!): ContentInterface
}

interface ContentInterface {
  _id: Int!
  _type: String! @trim(field: "type")
  name: ContentInterfaceName!
  teaser: ContentInterfaceTeaser!
  body: ContentInterfaceBody!

  status: Int!

  primaryWebsiteSectionEdge: ContentInterfacePrimaryWebsiteSectionEdge!
}

type ContentInterfaceName {
  default: String!
  email: String
  magazine: String
  website: String
}

type ContentInterfacePrimaryWebsiteSectionEdge {
  node: WebsiteSection!
}

type ContentInterfaceTeaser {
  default: String
  email: String
  magazine: String
  website: String
}

type ContentInterfaceBody {
  default: String
  email: String
  magazine: String
  website: String
}

input QueryContentInterfaceByIdInput {
  id: Int!
}




# CONTENT TYPES
type ContentArticle implements ContentInterface @interfaceFields {
  _id: Int!
}

type ContentCompany implements ContentInterface @interfaceFields {
  _id: Int!
}

`;
