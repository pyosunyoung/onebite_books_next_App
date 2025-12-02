'use server'
import { revalidatePath, revalidateTag } from "next/cache";

 // 지시자. 이 함수는 서버 액션으로 동작됨.

export async function createReviewAction(formData : FormData ) {
    console.log("server action called") // api를 생성한 것과 같음.
    console.log(formData); //FormData { content: '123', author: '123' }
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString(); //123
    const author = formData.get("author")?.toString(); // 123

    console.log(bookId, content, author);

    if(!bookId || !content || !author){
      return;
    }

    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,{
        method:"POST",
        body: JSON.stringify({bookId, content, author}),
      });
      console.log(response.status);
      //1. 특정 주소의 해당하는 페이지만 재검증
      // revalidatePath(`/book/${bookId}`); //next 서버측에게 이 경로 해당하는 페이지를 다시 생성 즉 (재검증)
      // //2. 특정 경로의 모든 동작 페이지를 재검증
      // revalidatePath(`/book/[id]`, "page");
      // //3. 특정 레이아웃을 갖는 모든 페이지 재검증
      // revalidatePath('/(with-searchbar)', 'layout');
      // //4. 모든 데이터 재검증
      // revalidatePath('/', 'layout');
      //5. 태그 기준, 데이터 캐시 재검증
      revalidateTag(`review-${bookId}`); 
      //이것을 쓰는게 더 효율적. 페이지를 재검증 하기 위해 fetch가 필요없는 것 까지 fetch 그리고 캐시를 삭제해야하지만
      //이건 태그가 들어있는 부분만 fetch하기 때문에 더욱 효율적으로 재검증. 
      // //const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
      // {next : {tags: [`review-${bookId}`]}}
    } catch(err){
      console.error(err);
      return;
    }
  }
