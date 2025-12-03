import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";
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
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`} />
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

async function ReviewList({bookId}: {bookId: string}) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    // {next : {tags: [`review-${bookId}`]}}
  )

  if(!response.ok){
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return <section>{reviews.map((review) => <ReviewItem key={`review-item-${review.id}`} {...review}/>)}</section>;
}

// export function generateStaticParams(){ //정적인 파라미터를 생성하는 함수.
//   return [{id:"1"}, {id:"2"}, {id:"3"}]; //book/1 ,2 ,3 빌드 타임에 생성됨.
// }// 근데 실시간으로 4번~까지 생성됨.
// //그 이유는 실시간으로 다이나믹 페이지로서 만들어지기 떄문임. 그 이후 다시 랜더링 할떄는 풀라우트 캐시가 적용되어 빠르게 랜더됨.

//북페이지는 현재 조회하는 데이터가 메타 데이터 안에 포함되면 좋을듯? 
//그래서 fetch로 현재 조회한 디테일 데이터를 가져와서 title,description을 추출해서 그것을 메타 데이터에 넘겨주는 것.
//현재 조회한 즉 디테일 페이지의 도서의 정보를 기반으로 메타 데이터가 설정됨.
//근데 api를 두번 조회하면 문제 생기는거 아님? => 중복 데이터는 한번만 호출하는 캐시 기능 request memoization을 통해 자동 해결
export async function generateMetadata({params}: {
  params: Promise<{ id: string }>;
}){
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );

  if(!response.ok){
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();

  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {  // ⭐ Next.js 15.1: params는 Promise이므로 await 필수
  const {id} = await params
  return <div className={style.container}>
    <BookDetail bookId={id}/>
    <ReviewEditor bookId={id}/>
    <ReviewList bookId={id} />
  </div>
}
