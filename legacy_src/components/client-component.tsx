"use client";

import { ReactNode } from "react";
export default function ClientComponent({children,}:{
  children: ReactNode;
}){
  console.log("클라이언트 컴포넌트")
  return <div>{children}</div> // 이렇게 children으로 넘겨주는 구조로 바꾸면 next는 children으로 전달된 server 컴포넌트는 클라이언트 컴포넌트로 변경되지 않음.
  //props를 오로지 children으로 받기 때문에
  //return <ServerComponent></ServerComponent> // 서버 컴포넌트 => 클라이언트 컴포넌트
} //이렇게 되면 server가 client로 바뀌기 떄문에 js bundle용량이커짐 그러면 TTI로 가는 과정도 길어져서 되도록이면 이렇게 설정하면 안됨.

//즉 직접 import하지 말고 children으로 props를 바꿔서 진행시키자 이거 근데 뭔말이지 너가 정리 좀 부탁함.