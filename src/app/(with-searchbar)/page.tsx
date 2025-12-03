import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

// export const dynamic = 'error'
//특정 페이지의 유형을 강제로 static, Dynamic 페이지로 설정
//1. auto : 기본값(생략가능), 아무것도 강제하지 않음
//2. force-dynamic: 페이지를 강제로 Dynamic 페이지로 설정.
//3. force-static: 페이지를 강제로 static 페이지로 설정.
//4. error: 페이지를 강제로 static 페이지로 설정 (static으로 설정하면 안되는 이유가 있다면 => 빌드 오류를 발생시킴)

//이 옵션은 특별한 상황이 아니면 권장하지 않음.
//app router같은 경우는 각가의 컴포넌트들이 동작에 따라서 스태틱, 다이나믹으로 자동설정해주는 좋은 기능을
//이미 가지고 있어서 굳이? 사용안하는 것이 좋긴해
async function AllBooks() {
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>
  }
  const allBooks: BookData[] = await response.json(); // fetch로 들어올 때 어떤 타입으로 들어올지 모르기 떄문에 book any타입 오류가 발생
  console.log("allbooks", allBooks);

  return <div>
    {allBooks.map((book) => (
      <BookItem key={book.id} {...book} />
    ))}
  </div>
}

async function RecoBooks() {
  await delay(3000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>
  }
  const recoBooks: BookData[] = await response.json();
  return <div>
    {recoBooks.map((book) => (
      <BookItem key={book.id} {...book} />
    ))}
  </div>
}

export const dynamic = "force-dynamic";

export const metadata : Metadata = {
  title: "한입 북스",
  description: "한입 북스에 등록된 도서를 만나보세요",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요",
    images: ['/thumbnail.png'], //이 /는 public 디렉토리를 가리킴
  },
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={
            <BookListSkeleton count={3}/>}>
          <RecoBooks />
        </Suspense>

      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={
          <BookListSkeleton count={10}/>}>
          <AllBooks />
        </Suspense>

      </section>
    </div>
  );
}
