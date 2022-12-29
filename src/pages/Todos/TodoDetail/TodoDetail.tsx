import { useParams } from 'react-router-dom';
function TodoDetail() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      id : {id} 의 상세 영역
      {/* 보기모드일 때 */}
      <div>선택된 Todo 보기</div>
      <button>수정모드</button>
      {/* 수정모드일 때, */}
      <button>수정내용 제출</button>
      <button>삭제</button>
    </div>
  );
}

export default TodoDetail;
