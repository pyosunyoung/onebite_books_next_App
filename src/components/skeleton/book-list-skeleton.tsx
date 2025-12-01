import BookItemSkeleton from "./book-item-skeleton";

export default function BookListSkeleton({
  count,
}: {count: number}){
  return new Array(count).fill(0).map((_, idx) => <BookItemSkeleton key={`book-item-skeleton-${idx}`}/>)
  // 배열 일단 0으로 초기화 안에 모두 0이 들어있고 
}