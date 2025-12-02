'use client'

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react"

export default function ReviewItemDeleteButton({reviewId, bookId}: {
  reviewId: number;
  bookId: number;
}){

  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(deleteReviewAction, null); // 두번쨰 인수는 기본값?
  useEffect(()=>{
    if(state && !state.status){
      alert(state.error)
    }
  },[state])
  
  return( 
  <form ref={formRef} action={formAction}>
    <input name="reviewId" value={reviewId} hidden readOnly/>
    <input name="bookId" value={bookId} hidden readOnly/>
    {isPending ? <div>...</div> : (
      <div onClick={()=> formRef.current?.requestSubmit()}>삭제하기</div>
    )}
  </form> //div 태그가 클릭이 되었을 때 폼태그가 강제로 제출 되어지게 설정.
  ) // requestSubmit을 사용하는 이유는 사용자가 의도한 대로 안전하게 동작.
} // 하지만 기존 submit은 유효성 검사, 이벤트 핸들러등을 다 무시하고 강제로 폼에 제출함. 
// 이렇게 레퍼런스 객체를 사용하면 div태그를 통해 submit이 가능하다 