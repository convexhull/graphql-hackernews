import React from "react";
import { useQuery } from "urql";
import { gql } from 'graphql-tag';
import Link from "./Link";


const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`
const LinkList = () => {
  const [result, reex] = useQuery({ query: FEED_QUERY })
  const { data, fetching, error } = result
 
  if (fetching) return <div>Fetching</div>
  if (error) return <div>Error</div>

  const linksToRender = data.feed.links;
  // setTimeout(() => reex(), 2000);
  return (
    <div>
      {linksToRender.map(link => <Link key={link.id} link={link} />)}
    </div>
  );
}


export default LinkList;
