import {html} from "../AboutHtml";
    
  

export function About(){
    return (
        <div
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
    );
}
