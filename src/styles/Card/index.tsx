import React from "react";
import styled from "styles/styled";
import { css } from "@emotion/core";

interface ICard {
  title?: string;
  width?: number;
  thumbnail: string | null;
  children: React.ReactNode;
  onClick?: () => void;
}

interface ICardWrap {
  width?: number;
}

const Card: React.FC<ICard> = ({ width, title, onClick, thumbnail, children }) => {
  return (
    <Outer className={"card"} onClick={onClick}>
      <Wrap width={width}>
        {title && <CardHeader>{title}</CardHeader>}
        {thumbnail && (
          <ThumbnailWrap>
            <img src={thumbnail} />
          </ThumbnailWrap>
        )}
        <CardBody expandable={thumbnail}>
          <p>{children}</p>
        </CardBody>
      </Wrap>
    </Outer>
  );
};

export default Card;

const LongSentence = css`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Outer = styled.div`
  padding: 0.5rem;
  width: 100%;
`;

const Wrap = styled.div<ICardWrap>`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: calc(362px - 2rem);
  font-size: 1rem;
  line-height: 1.2;
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 2px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s, -webkit-box-shadow 0.3s;

  :hover {
    border-color: transparent;
    transform: translateY(-5px);
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  }
`;

const CardHeader = styled.div`
  padding: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #e6e6e6;
  white-space: nowrap;
  ${LongSentence}
`;

const MaxLine = css`
  -webkit-line-clamp: 3 !important;
`;

const CardBody = styled.div<{ expandable: string | null }>`
  padding: 1rem;

  p {
    display: -webkit-box;
    font-size: 0.875rem;
    line-height: 1.5;
    -webkit-box-orient: vertical;
    ${(props) => props.expandable && MaxLine}
    ${LongSentence}
    word-break: break-word;
    overflow-wrap: break-word;
    -webkit-line-clamp: 11;
  }
`;

const ThumbnailWrap = styled.div`
  margin-left: -1px;
  margin-right: -1px;
  transform: translateY(-1px);

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
`;
