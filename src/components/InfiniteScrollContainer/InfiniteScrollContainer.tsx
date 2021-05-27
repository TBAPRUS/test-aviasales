import React, { LegacyRef, useCallback, useEffect, useState } from "react";
import { Indexed } from "../../store/types/indexedTypes";

export type InfiniteScrollContainerElement = (props: InfiniteScrollContainerElementProps) => JSX.Element;

export interface InfiniteScrollContainerElementProps {
  containerRef?: LegacyRef<HTMLElement>;
}
export interface InfiniteScrollContainerProps {
  elements: Indexed[];
  elementJSX: InfiniteScrollContainerElement
}

export default function InfiniteScrollContainer(
  props: React.PropsWithChildren<InfiniteScrollContainerProps>
): JSX.Element {
  const [elementHeight, setElementHeight] = useState(0);
  const [elementSpace, setElementSpace] = useState(0);
  const [startElementIndex, setStartElementIndex] = useState(0);
  const [elementCountOnScreen, setElementCountOnScreen] = useState(0);
  const [scrollLength, setScrollLength] = useState(0);
  const [lastPageYOffset, setLastPageYOffset] = useState(0);
  const [startList, setStartList] = useState(0);
  const elementCountMargin = 2;

  useEffect(() => {
    if (
      scrollLength >
      elementHeight +
        elementSpace +
        startList +
        (elementCountMargin + 1) * elementHeight +
        elementCountMargin * elementSpace
    ) {
      window.scrollBy(0, -(elementHeight + elementSpace));
      setLastPageYOffset(window.pageYOffset);
      setStartElementIndex((startElementIndex) => startElementIndex + 1);
      setScrollLength(
        (scrollLength) => scrollLength - (elementHeight + elementSpace)
      );
    } else if (
      scrollLength <
      startList +
        elementCountMargin * elementHeight +
        (elementCountMargin - 1) * elementSpace
    ) {
      if (startElementIndex > 0) {
        window.scrollBy(0, elementHeight + elementSpace);
        setLastPageYOffset(window.pageYOffset);
        setStartElementIndex((startElementIndex) =>
          startElementIndex > 0 ? startElementIndex - 1 : 0
        );
        setScrollLength(
          (scrollLength) => scrollLength + elementHeight + elementSpace
        );
      }
    }
  }, [scrollLength, elementHeight, elementSpace, startElementIndex, startList]);

  useEffect(() => {
    const listener = (e: Event) => {
      let newLastPageYOffset = window.pageYOffset;
      const difference = window.pageYOffset - lastPageYOffset;
      setScrollLength((scrollLength) => scrollLength + difference);
      setLastPageYOffset(newLastPageYOffset);
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [
    elementCountMargin,
    elementHeight,
    elementSpace,
    startList,
    lastPageYOffset,
    scrollLength,
  ]);

  useEffect(() => {
    setElementCountOnScreen(window.innerHeight / elementHeight);
  }, [elementHeight]);

  const ticketRef = useCallback((node: HTMLElement) => {
    if (node) {
      const parent = node.parentElement;
      if (parent) {
        setStartList(parent.getBoundingClientRect().top + window.scrollY);
        setElementSpace(
          parent.children[1].getBoundingClientRect().top -
            parent.children[0].getBoundingClientRect().bottom
        );
      }
      setElementHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const elements = props.elements.slice(
    startElementIndex,
    startElementIndex + elementCountOnScreen + (elementCountMargin + 2) * 2
  );
  const firstElement = elements.shift();
  const elementsJSX: JSX.Element[] = elements.map((element) => (
    <props.elementJSX key={element.id} {...element} />
  ));
  if (firstElement) {
    elementsJSX.unshift(
      <props.elementJSX
        key={firstElement.id}
        containerRef={ticketRef}
        {...firstElement}
      />
    );
  }

  return <>{elementsJSX}{props.children}</>;
}
