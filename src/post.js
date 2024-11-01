import { useState, useEffect } from "react";
import data from "./data.json";
import styled from "styled-components";
import Pagination from "./pagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [word, setWord] = useState("");
  const offset = (page - 1) * limit;
  const search = posts.filter((post) =>
    post.title.toString().toLowerCase().includes(word)
  );

  useEffect(() => {
    setPosts(data);
  }, []);

  return (
    <Layout>
      <header>
        <h1>게시물 목록</h1>
      </header>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          style={{ marginRight: "30px" }}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        게시물 제목 검색 :&nbsp;
        <input
          type="text"
          onChange={({ target: { value } }) => {
            setWord(value);
          }}
        />
      </label>
      <main>
        {search.slice(offset, offset + limit).map(({ id, title, body }) => (
          <article key={id}>
            <h3>
              {id}. {title}
            </h3>
            <p>{body}</p>
          </article>
        ))}
      </main>
      <footer>
        <Pagination
          total={search.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

export default Posts;
