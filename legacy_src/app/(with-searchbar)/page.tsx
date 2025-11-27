import { useEffect } from "react";
import styles from "./page.module.css";
import ClientComponent from "../../components/client-component";
import ServerComponent from "../../components/server-component";

export default function Home() { // 서버 컴포넌트
  
  return (
    
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        <ServerComponent/>
      </ClientComponent>
    </div>
    //지금 그래서 home => client => server(클라이언트로 변환)로 배치된 상황.
  );
}
