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
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`
const LinkList = (props) => {


  const isNewPage = props.location.pathname.includes('new')
  const page = parseInt(props.match.params.page, 10)

  const variables = React.useMemo(() => ({
    skip: isNewPage ? (page - 1) * 10 : 0,
    first: isNewPage ? 10 : 100,
    orderBy: isNewPage ? 'createdAt_DESC' : null
  }), [isNewPage, page])


  const [result] = useQuery({ query: FEED_QUERY, variables })
  const { data, fetching, error } = result
  


  const nextPage = React.useCallback(() => {
    if (page <= data.feed.count / 10) {
      props.history.push(`/new/${page + 1}`);
    }
  }, [props.history, data.feed.count, page]);

  const previousPage = React.useCallback(() => {
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }, [props.history, page]);
  
  if (fetching) return <div>Fetching</div>
  if (error) return <div>Error</div>
  const pageIndex = isNewPage ? (page - 1) * 10 : 0;
  
  const linksToRender = data.feed.links;
  return (
    <>
    <div>
      {linksToRender.map((link, index) => (
        <Link key={link.id} link={link} index={pageIndex + index} />
      ))}
    </div>
    {isNewPage && (
        <div className="flex ml4 mv3 gray">
          <div className="pointer mr2" onClick={previousPage}>
            Previous
          </div>
          <div className="pointer" onClick={nextPage}>
            Next
          </div>
        </div>
      )}
    </>
  )
}


export default LinkList;
