import React from "react";
import { Button, Card, Collapse, Panel } from "styles";
import styled from "styles/styled";
import { EmptyLayout } from "layouts";

const Guide = () => {
  return (
    <Container>
      <Component>
        <Label>카드</Label>
        <Wrap>
          <Card title={"써보겠습니다아아아아아아아아아아아아길게길게한번써보겠습니"} thumbnail={"https://images.loelblog.com/thumb/1614754054423background.jpg"}>
            길게길게 한번 써보겠습니다아아. 아아아아. 아아아아아아. 길게길게 한번 써보겠습니다아아. 아아아아. 아아아아아아. 길게길게 한번 써보겠습니다아아. 아아아아. 아아아아아아.
          </Card>
          <Card title={"Hello"} thumbnail={null}>
            길게길게 한번 써보겠습니다아아. 아아아아. 아아아아아아.
          </Card>
          <Card thumbnail={null}>길게길게 한번 써보겠습니다아아. 아아아아. 아아아아아아.</Card>
        </Wrap>
      </Component>
      <Component>
        <Label>버튼</Label>
        <Wrap>
          <Button>버튼</Button>
          <Button variant={"secondary"}>버튼</Button>
          <Button variant={"success"}>버튼</Button>
          <Button variant={"warning"}>버튼</Button>
          <Button variant={"danger"}>버튼</Button>
          <Button variant={"info"}>버튼</Button>
          <Button variant={"dark"}>버튼</Button>
        </Wrap>
      </Component>
      <Component>
        <Label>컬랩스</Label>
        <Wrap>
          <Collapse active={[0, 1]} accordion>
            <Panel title={"컬랩스"}>Hello</Panel>
            <Panel title={"컬랩스"}>Hello</Panel>
            <Panel title={"컬랩스"}>Hello</Panel>
          </Collapse>
        </Wrap>
      </Component>
    </Container>
  );
};

export default EmptyLayout(Guide);

const Container = styled.div`
  padding: 1rem 1rem 5rem;
`;

const Component = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Wrap = styled.div`
  display: flex;

  button + button {
    margin-left: 10px;
  }
`;

const Label = styled.div`
  margin: 10px 0;
  font-size: 20px;
  font-weight: 500;
`;
