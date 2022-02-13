import "./links.css";
import { FiArrowLeft, FiLink, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getSavedLinks, deleteLink } from "../../services/storeLinks";
import LinkItem from "../../components/LinkItem";

export default function Links() {
  const [myLinks, setMyLinks] = useState([]);

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function getLinks() {
    const result = await getSavedLinks("@linksCurtos");
    setMyLinks(result);
  }

  useEffect(() => {
    getLinks();
  }, []);

  function handleOpenLink(link) {
    setData(link);
    setShowModal(true);
  }

  async function handleDelete(id) {
    const result = await deleteLink(myLinks, id);
    setMyLinks(result.length > 0 ? result : []);
  }

  return (
    <div className="links-container">
      <div className="links-header">
        <Link to="/">
          <FiArrowLeft size={38} color="#FFF" />
        </Link>
        <h1>Meus Links</h1>
      </div>

      {myLinks.length > 0 ? (
        myLinks.map((link) => (
          <div key={link?.id} className="links-item">
            <button className="link" onClick={() => handleOpenLink(link)}>
              <FiLink size={18} color="#FFF" />
              {link?.long_url}
            </button>
            <button
              className="link-delete"
              onClick={() => handleDelete(link.id)}
            >
              <FiTrash size={24} color="#FF5454" />
            </button>
          </div>
        ))
      ) : (
        <div className="links-item">
          <h2 className="empty-item-list">Ainda não há links salvos...</h2>
        </div>
      )}

      {showModal && (
        <LinkItem closeModal={() => setShowModal(false)} content={data} />
      )}
    </div>
  );
}
