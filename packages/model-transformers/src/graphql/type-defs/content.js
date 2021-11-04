import gql from '@cms-apis/graphql/tag';

export default gql`

extend type Query {
  contentById(input: QueryContentByIdInput!): Content
  allContent(input: PaginatedQueryInput = {}): QueryAllContentConnection!
}

enum ContentTypeEnum {
  ARTICLE
  BLOG
  COMPANY
  CONTACT
  DOCUMENT
  EVENT
  JOB
  MEDIA_GALLERY
  NEWS
  PAGE
  PODCAST
  PRESS_RELEASE
  PRODUCT
  PROMOTION
  SPACE
  SUPPLIER
  TOP_LIST
  TEXT_AD
  VENUE # @todo Entity/Venue + ContentVenue (set "spaces" as an array field)
  VIDEO
  WEBINAR
  WHITEPAPER
}

enum ContentContactTypeEnum {
  AUTHOR
  CONTRIBUTOR
  PHOTOGRAPHER
  LISTING
  PUBLIC
  SALES
  MARKETING
  EDITOR # from whitepaper
  MEDIA # where type in document, infographic, podcast, video, webinar, whitepaper and contacts field exists
  OTHER
}

enum ContentLinkSocialProviderEnum {
  FACEBOOK
  INSTAGRAM
  LINKEDIN
  PINTEREST
  TIKTOK
  TWITTER
  YOUTUBE
  OTHER
}

type Content {
  _id: Int!
  _type: ContentTypeEnum! @trim(field: "type")
  alias: String
  names: ContentNames
  teasers: ContentTeasers
  bodies: ContentBodies
  hash: String @trim
  notes: String @trim
  status: Int! @formatStatus
  dates: ContentDates
  slug: String @trim(field: "mutations.Website.slug")
  redirects: [String!]!
  connections: ContentConnections!
  edges: ContentEdges!
  labels: [String!]!
  sidebars: [ContentSidebar!]!
  # was the Contactable interface: applied to company, contact, event, supplier, venue
  contact: ContentContact
  # combines SocialLinkable, Contactable.website, Content.externalLinks, Company.[xxx]Url fields
  links: ContentLinks!
  # from ContentNews.source ContentNews.byline Contents.importSource
  syndication: ContentSyndication
  # from Inquirable
  inquiry: ContentInquiry
  # from Media plus "media-like" content fields
  media: ContentMedia
  seo: ContentSEO
}

type ContentBodies {
  default: String
  newsletter: String
  magazine: String
  website: String
  original: String
}

type ContentCompanyEdge {
  node: Content!
}

type ContentConnections {
  # combines Authorable, OrganizationContactable, Media.contacts and ContentWhitepaper.editors
  contacts: [ContentContactsEdge!]!
  images: [ContentImagesEdge!]!
  relatedTo: [ContentRelatedToEdge!]!
}

type ContentContact {
  # was the Addressable interface: applied to company, contact, event, supplier, top-100, venue
  address: ContentContactAddress
  phones: ContentContactPhones
  emails: ContentContactEmails
  person: ContentContactPerson
}

type ContentContactAddress {
  street: String
  streetExtra: String
  city: String @trim
  region: String @trim(field: "state")
  postalCode: String @trim(field: "zip")
  country: String @trim
  location: ContentContactAddressLocation
  cityRegionPostalCode: String
}

type ContentContactAddressLocation {
  type: String!
  coordinates: [Float!]!
}

type ContentContactEmails {
  default: String
  public: String
}

type ContentContactPerson {
  name: String
  firstName: String
  lastName: String
  title: String
}

type ContentContactPhones {
  default: String
  tollfree: String
  fax: String
  mobile: String
}

type ContentContactsEdge {
  type: ContentContactTypeEnum!
  node: Content!
}

type ContentCreatedByEdge {
  node: User!
}

type ContentDates {
  expired: DateTime
  published: DateTime
  created: DateTime
  updated: DateTime
  touched: DateTime
}

type ContentEdges {
  company: ContentCompanyEdge
  createdBy: ContentCreatedByEdge
  # from ContentCompany.parentCompany, ContentSupplier.parentSupplier, ContentVenue.parentVenue
  # must be of the same type as the root content model... might need to be restricted by type
  parent: ContentParentEdge
  primaryImage: ContentPrimaryImageEdge
  primaryWebsiteSection: ContentPrimaryWebsiteSectionEdge!
  updatedBy: ContentUpdatedByEdge
}

type ContentImagesEdge {
  node: ImageAsset!
}

type ContentInquiry {
  isEnabled: Boolean
  # @todo determine how to handle inquiry emails
  # emails: [String!]!
}

type ContentLinks {
  external: [ContentLinkExternal!]!
  social: [ContentLinkSocial!]!
  website: String
}

type ContentLinkExternal {
  key: String
  url: String!
  label: String
}

type ContentLinkSocial {
  provider: ContentLinkSocialProviderEnum!
  url: String!
  label: String
}

type ContentMedia {
  file: ContentMediaFile
  duration: Float
  source: ContentMediaSoure
  embedCode: String
  credit: String
}

type ContentMediaFile {
  name: String!
  path: String!
}

type ContentMediaSoure {
  id: String
  key: String
}
type ContentNames {
  default: String
  newsletter: String
  magazine: String
  website: String
  short: String
  full: String
  headline: String
}

type ContentParentEdge {
  node: Content!
}

type ContentPrimaryImageEdge {
  node: ImageAsset!
}

type ContentPrimaryWebsiteSectionEdge {
  node: WebsiteSection!
}

type ContentRelatedToEdge {
  node: Content!
}

type ContentSEO {
  title: String!
  description: String
}

type ContentSidebar {
  body: String! @trim(default: "")
  name: String @trim
  label: String @trim
  sequence: Int!
}

type ContentSyndication {
  source: String
  byline: String
}

type ContentTeasers {
  default: String
  newsletter: String
  magazine: String
  website: String
  deck: String
}

type ContentUpdatedByEdge {
  node: User!
}

input QueryContentByIdInput {
  id: Int!
}

type QueryAllContentConnection {
  edges: [QueryAllContentConnectionEdge!]!
  pageInfo: PageInfo!
}

type QueryAllContentConnectionEdge {
  node: Content!
  cursor: Cursor!
}

`;
