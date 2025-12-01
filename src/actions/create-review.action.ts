'use server' // 지시자. 이 함수는 서버 액션으로 동작됨.

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
    } catch(err){
      console.error(err);
      return;
    }
  }
