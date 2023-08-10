"use client";
import React from "react";
import DOMPurify from "dompurify";

function Results({ searchResults }) {
  const dataSearchResults = searchResults.documents;
  const cleanHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  if (searchResults == "error")
    return (
      <div className="error">
        {" "}
        The API is not responding please try again later.{" "}
      </div>
    );



  return (
    <div className="results">
      {dataSearchResults?.map((items, key) => (
        <div className="card" key={key}>
          <div>{items.document.play_name}</div>
          <div>
            <b>{items.document.speaker}</b> : &quot;
            {
              (items.highlight.text_entry == null || items.highlight.text_entry == undefined) ?
                (<span
                  dangerouslySetInnerHTML={cleanHTML(items.document.text_entry)}
                />) :

                (<span
                  dangerouslySetInnerHTML={cleanHTML(items.highlight.text_entry)}
                />)
            }

            &quot;
          </div>
        </div>
      ))}
    </div>
  );


}

export default Results;


