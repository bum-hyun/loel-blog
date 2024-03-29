import React, { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Global } from "@emotion/core";
import { Reset } from "styles";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../apollo";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const App = ({ Component, pageProps }: AppProps) => {
  const [authority, setAuthority] = useState<boolean>(false);

  const authenticated = (state: boolean) => {
    setAuthority(state);
  };

  const modifiedProps = { ...pageProps, authenticated, authority };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimum-scale=1, viewport-fit=cover" />
        <link rel="canonical" href="https://loelblog.com/" />
        <meta name="title" content="Loel's Blog" />
        <meta
          name="description"
          content="음식과 여행을 좋아하는 개발자의 블로그 입니다. 앞으로 주식 이야기, 음식 리뷰, 개발 이야기들을 올리고, 작은 서비스들도 하나씩 붙일 예정입니다."
        />
        <meta name="keywords" content="개발,음식,여행,react,graphql,레스토랑,미슐랭" />
        <meta property="og:title" content="Loel's Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://loelblog.com" />
        <meta property="og:description" content="음식과 여행을 좋아하는 개발자의 블로그 입니다." />
        <meta property="og:image" content="/background.jpg" />
        <meta name="robots" content="index, follow" />
        <title>Loel's Blog</title>
      </Head>
      <Global styles={Reset} />
      <ApolloProvider client={client as any}>
        <Component {...modifiedProps} />
      </ApolloProvider>
    </>
  );
};

export default App;
