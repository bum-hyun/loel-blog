import React, { useState } from "react";
import { GetStaticPropsContext, GetServerSidePropsContext } from "next";
import styled from "styles/styled";
import { DefaultLayout } from "layouts";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import Head from "next/head";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Button } from "styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_POST, REMOVE_POST } from "@api/Post";

const Post = ({ params }: GetServerSidePropsContext) => {
  const router = useRouter();

  const { category, id } = (params as unknown) as IParams;

  const [post, setPost] = useState<IReadPost | null>(null);

  useQuery(GET_POST, {
    fetchPolicy: "cache-first",
    variables: { id },
    onCompleted: (data) => {
      setPost(data.getPost);
    },
  });

  const [RemovePostMutation] = useMutation(REMOVE_POST, {
    onCompleted: () => {
      router.push(`/post/${category}`);
    },
  });

  const pushEditPage = () => {
    router.push(`/edit?id=${id}`);
  };

  const remove = async () => {
    await RemovePostMutation({
      variables: { id },
    });
    // const result = await service.delete(`http://localhost:8002/post/${id}`);
  };

  const decodeHTML = (html?: string) => {
    const content = html!.replace(/(<([^>]+)>)/gi, "");
    return content.substring(0, 150);
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={`https://loelblog.com/${category}/${id}`} data-rh="true" />
        <meta name="description" content={decodeHTML(post ? post.html : "로엘의 블로그입니다!")} />
      </Head>
      <PostWrap>
        {post && (
          <>
            <HeadWrap>
              <Title>{post.title}</Title>
              <InfoWrap>
                <Author>{post.email}</Author>
                <Date>{dayjs(post.updatedAt).format("YYYY년 MM월 DD일 hh시 mm분 ss초")}</Date>
                <EditWrap>
                  <Button onClick={pushEditPage} variant={"warning"}>
                    수정
                  </Button>
                  <Button onClick={remove} variant={"danger"}>
                    삭제
                  </Button>
                </EditWrap>
              </InfoWrap>
            </HeadWrap>
            <ContentWrap className={"tui-editor-contents"} dangerouslySetInnerHTML={{ __html: post.html as string }} />
          </>
        )}
      </PostWrap>
    </>
  );
};

export async function getServerSideProps({ params }: GetStaticPropsContext) {
  return {
    props: { params },
  };
}

export default DefaultLayout(Post);

const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 3rem 4rem;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
`;

const HeadWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  line-height: 1.5;
  font-weight: 800;
  color: #313131;
  word-break: keep-all;
  margin-bottom: 2rem;
`;

const InfoWrap = styled.div`
  display: flex;
  font-size: 1rem;
`;

const Author = styled.span`
  margin-right: 1rem;
  font-weight: 600;
`;

const Date = styled.span``;

const ContentWrap = styled.section`
  font-size: 1rem;
`;

const EditWrap = styled.div`
  margin-left: auto;

  button + button {
    margin-left: 0.5rem;
  }
`;