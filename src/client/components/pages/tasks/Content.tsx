import TaskTable from "./TaskTableDB";
import ContentWrapper from "../../global/ContentWrapper";
import React from "react";


const Content = () => {
    return (
    <ContentWrapper>
      <TaskTable taskStatuses = 'null'/>
    </ContentWrapper>
  );
};

export default Content;
