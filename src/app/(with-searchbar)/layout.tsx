import { ReactNode } from "react";
import SearchBar from "./searchbar";

export default function Layout(
  { children }: {
    children: ReactNode;
  }
) {
  return (
    <div>
      <SearchBar />
      <div>임시 서치바</div>
      {children}
    </div>
  );
}