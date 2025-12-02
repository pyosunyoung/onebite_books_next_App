"use client"

import { createReviewAction } from "@/actions/create-review.action"
import style from "./review-editor.module.css"
import { useActionState, useEffect } from "react"


export default function ReviewEditor({ bookId }: { bookId: string }) {

  const [state, formAction, isPending] = useActionState(createReviewAction, null);
  //useActionstate를 이용해서 리뷰 작성 로딩 구현.

  useEffect(()=>{
    if(state && !state.status){ // state값이 존재하고 state값이 false일 때 에러 핸들링
      alert(state.error)
    }
  },[state])

  //bookid를 직접 작성하는 것 방지
  return <section>
    <form
      className={style.form_container}
      action={formAction}>
      <input name="bookId" value={bookId} hidden readOnly />

      <textarea required name="content" placeholder="리뷰 내용" />
      <div className={style.submit_container}>
        <input disabled={isPending} required name="author" placeholder="작성자" />
        <button disabled={isPending} type="submit">{isPending ? "..." : "작성하기"}</button>
      </div> 
    </form>
  </section>
} //