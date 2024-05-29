import React from "react";

export function parseHtml(htmlString: string): React.ReactNode {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  function handleElement(node: Node): React.ReactNode {
    const children = Array.from(node.childNodes).map((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        return child.textContent;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        return handleElement(child);
      }
      return null;
    });

    switch (node.nodeName) {
      case "H1":
        return React.createElement(
          "h1",
          { key: node.nodeName + Math.random() },
          ...children
        );
      case "H2":
        return React.createElement(
          "h2",
          { key: node.nodeName + Math.random() },
          ...children
        );
      case "H3":
        return React.createElement(
          "h3",
          { key: node.nodeName + Math.random() },
          ...children
        );
      case "DIV":
        return React.createElement(
          "div",
          { key: node.nodeName + Math.random() },
          ...children
        );
      case "P":
        return React.createElement(
          "p",
          { key: node.nodeName + Math.random() },
          ...children
        );
      case "UL":
        return React.createElement(
          "ul",
          { key: node.nodeName + Math.random() },
          ...children
        );
      case "LI":
        return React.createElement(
          "li",
          { key: node.nodeName + Math.random() },
          ...children
        );
      default:
        return children;
    }
  }

  return handleElement(doc.body);
}
