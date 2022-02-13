import { useState } from "react";
import { FiLink } from "react-icons/fi";
import "./home.css";

import Menu from "../../components/Menu";
import LinkItem from "../../components/LinkItem";

import api from "../../services/api";
import { saveLink } from "../../services/storeLinks";

export default function Home() {
  const [link, setLiink] = useState("");
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);

  async function handleShortLink() {
    if (link) {
      try {
        const response = await api.post("/shorten", { long_url: link });

        setData(response.data);
        setShowModal(true);

        saveLink("@linksCurtos", response.data);
        setLiink("");
      } catch {
        setLiink("");
        alert("Algo deu errado!");
      }
    } else alert("Informe um link!");
  }

  return (
    <div className="container-home">
      <div className="logo">
        <img src="/logo.png" alt="Logo meu link" />
        <h1>MeuLink</h1>
        <span>Cole seu link para encurtar 👇</span>
      </div>

      <div className="area-input">
        <div>
          <FiLink size={22} color="#fff" />
          <input
            placeholder="Cole seu link aqui..."
            value={link}
            onChange={(e) => setLiink(e.target.value)}
          />
        </div>
        <button onClick={handleShortLink}>Gerar Link</button>
      </div>

      <Menu />

      {showModal && (
        <LinkItem closeModal={() => setShowModal(false)} content={data} />
      )}
    </div>
  );
}
