import BookPage from "@/app/book/[id]/page"
import Modal from "@/components/modal";

export default function Page(props: any) { // 기존 props 즉 상세페이지를 그대로 가져옴.
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  )
}

