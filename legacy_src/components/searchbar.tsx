"use client"; //상호작용이 필요한 컴포넌트 이기 떄문에 use Client로 변경
import { useState } from "react"
import { useRouter } from "next/navigation";
export default function SearchBar(){
  const router = useRouter();
  const [search,setSearch] = useState("")
  const onChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onSubmit = () => {
    router.push(`/search?q=${search}`)
  };

  return(
    <div>
      <input value={search} onChange={onChangeSearch}/>
      <button onClick={onSubmit}>검색</button>
    </div>
  )
}