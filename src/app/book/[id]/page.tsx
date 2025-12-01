import { notFound } from "next/navigation";
import style from "./page.module.css";
import { createReviewAction } from "@/actions/create-review.action";
// export const dynamicParams = false;
//generateStaticParams()안 
// id(1,2,3) 제외한 다이나믹 페이지는 모두 404 not found로 만들어보자

async function BookDetail({bookId}:{bookId: string}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if(response.status === 404){
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor({bookId}: {bookId: string}){
  //bookid를 직접 작성하는 것 방지
  return <section>
    <form action={createReviewAction}>
      <input name="bookId" value={bookId} hidden readOnly/>
      
      <input required name="content" placeholder="리뷰 내용"/>
      <input required name="author" placeholder="작성자"/>
      <button type="submit">작성하기</button>
    </form>
  </section>
}

export function generateStaticParams(){ //정적인 파라미터를 생성하는 함수.
  return [{id:"1"}, {id:"2"}, {id:"3"}]; //book/1 ,2 ,3 빌드 타임에 생성됨.
}// 근데 실시간으로 4번~까지 생성됨.
//그 이유는 실시간으로 다이나믹 페이지로서 만들어지기 떄문임. 그 이후 다시 랜더링 할떄는 풀라우트 캐시가 적용되어 빠르게 랜더됨.
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {  // ⭐ Next.js 15.1: params는 Promise이므로 await 필수
  return <div className={style.container}>
    <BookDetail bookId={(await params).id}/>
    <ReviewEditor bookId={(await params).id}/>
  </div>
}
