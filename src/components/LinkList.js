import React, { Component } from 'react';
import Link from './Link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LinkList extends Component {
  render() {
    // Loading Msg
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>;
    }

    // Error Msg
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>;
    }

    const linksToRender = this.props.feedQuery.feed.links;

    return (
      <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>
    );
  }
}

// GraphQL Query
// FeedQuery is the operation name used by Apollo
const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

// "Wrap" the LinkList container with query
export default graphql(FEED_QUERY, { name: 'feedQuery' })(LinkList);
