import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

async function AllBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {cache : "force-cache"}
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {next: {revalidate: 3}}
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

export default function Home() {


  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks/>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
