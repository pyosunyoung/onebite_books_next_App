"use client";


import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";
//reset 에러가 발생한 부분을 복구시키기 위해 리렌더링을 실시하는 함수?
export default function Error({error, reset} : {error : Error; reset: () => void;}){

  const router = useRouter();

  useEffect(()=>{
    console.error(error);
  }, [error])

  return <div>
    <h3>오류가 발생했습니다.</h3>
    <button onClick={() => {
      startTransition(()=>{//router.refresh는 비동기적으로 동작해서 await는 오류나서 x 이거로 해결
      //이건 하나의 콜백함수를 인자로 전달 받아서 콜백 함수안의 UI를 변경시키는 작업을 일괄적으로 처리함.

      router.refresh()  //이 작업을 동시에 진행함. 
      reset() //위 작업을 동시에 진행함. 

    });
      // router.refresh() // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러움. next 서버에게 서버 컴퍼넌트만 새로 랜더링, 즉 다시 fetch한다. => 여기서 에러 상태는 초기화 x reset으로 초기화 시켜야함.
      // reset() // 새롭게 랜더링된 서버 컴퍼넌트의 데이터를 화면에 새롭게 재 랜더링하게 설정, 그리고 에러 상태를 초기화, 컴포넌트들을 다시 렌더링.
      
    }}>다시시도</button> 
    
  </div>
} //reset이란 메서드는 클라이언트 측에서만 서러로 부터만 전달받은 데이터를 이용해서 다시 렌더링하는
// 그런 구조이기 떄문에 서버측에서 실행되는 서버 컴퍼넌트를 다시 실행하지 않아서 다시시도 버튼을 눌러도 데이터 fetch를 다시 실행하지 않아서 복구 할 수 없음
// 클라이언트 내부에서 발생한 오류만 복구 가능
// => 해결법 브라우저를 강제로 다시 실행시키는 방법으로 해결가능하긴함. window.location.reload() 이렇게
 
//client로 설정한 것은 서버, 클라이언트 모두에서 실행되어 어떠한 환경에서도 에러 컴퍼넌트가 대응가능하게
//설정.