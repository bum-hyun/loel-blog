import React from "react";
import Header from "layouts/Header";
import styled from "styles/styled";
import Categories from "../components/Categories";
import { GetServerSidePropsContext } from "next";
import CheckList from "components/CheckList";
import service from "@utils/service";
import { Button } from "styles";

interface Props extends GetServerSidePropsContext {
  authority: boolean;
  authenticated: (state: boolean) => void;
}

const DefaultLayout = (Component: (props: Props) => JSX.Element) => (props: Props) => {
  const makeSitemap = async () => {
    const result = await service.get("/sitemap/posts.xml");
    console.log(result);
  };

  const getData = async () => {
    const result = await service.get("/dart");
  };

  const getData2 = async () => {
    const result = await service.get("/data");
  };

  const getData3 = async () => {
    const result = await service.get("/excel");
  };

  return (
    <>
      <Header authority={props.authority} authenticated={props.authenticated} />
      <Container>
        <Background />
        <Wrap>
          <LeftWrap>
            <Component {...props} />
          </LeftWrap>
          <RightWrap>
            <button onClick={getData}>버튼</button>
            <button onClick={getData2}>버튼</button>
            <button onClick={getData3}>버튼</button>
            <Categories />
            <CheckList />
            {props.authority && <Button onClick={makeSitemap}>사이트맵 생성</Button>}
          </RightWrap>
        </Wrap>
      </Container>
    </>
  );
};

export default DefaultLayout;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1440px;
`;

const Background = styled.div`
  width: 100%;
  padding-top: 35%;
  background-image: url("https://images.loelblog.com/original/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const Wrap = styled.section`
  display: flex;
  padding: 1rem;
`;

const LeftWrap = styled.div`
  flex: 1;
  width: 100%;
`;

const RightWrap = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    flex: 0 0 300px;
    width: 100%;
    height: 100%;
    margin-left: 1rem;
    padding-left: 1rem;

    > div + div {
      margin-top: 2rem;
    }
  }
`;
