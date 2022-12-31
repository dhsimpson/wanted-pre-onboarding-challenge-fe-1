import { useRef, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { todoCreateApi } from 'api/todoApi';

function AddTodo() {
  let authToken: string | null = localStorage.getItem('authtoken');
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const [isAdd, setIsAdd] = useState(false);

  const todoCreateMutation = useMutation(todoCreateApi, {
    onSuccess: data => {
      alert('추가 완료!');
      setIsAdd(false);
    },
    onError: e => {
      console.error(e);
      alert('추가 실패!');
    },
  });

  useEffect(() => {
    return () => {
      authToken = null;
    };
  });

  return (
    <>
      {isAdd ? (
        <>
          <input type="text" ref={titleRef} />
          <input type="text" ref={contentRef} />
          <button
            onClick={() => {
              const title = titleRef.current!.value;
              if (title.length == 0) {
                alert('제목을 적어 주세요!');
                return;
              }
              const content = contentRef.current!.value;

              if (content.length == 0) {
                alert('내용을 적어 주세요!');
                return;
              }

              todoCreateMutation.mutate({
                authToken: authToken!,
                title,
                content,
              });
            }}
          >
            추가하기
          </button>
          <button onClick={() => setIsAdd(false)}>취소</button>
        </>
      ) : (
        <button onClick={() => setIsAdd(true)}>추가버튼</button>
      )}
    </>
  );
}
export default AddTodo;
