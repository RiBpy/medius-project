import React, { useState } from "react";
import DynamicModal from "./DynamicModal";
import NestedModal from "./NestedModal";

const Problem2 = () => {
    const [modalOpen, setModalOpen] = useState(false);
  const [nestedModalOpen, setNestedModalOpen] = useState(false);
  const [nestedModalContent, setNestedModalContent] = useState(null);

  const openModal = (title, content) => {
    setModalOpen(true);
    setModalContent({
      title,
      content,
    });
  };

  const openNestedModal = async(title, identifier) => {
    setNestedModalOpen(true);

    let content = null;

    if (identifier === "all") {
      try {
        const response = await fetch("https://contact.mediusware.com/api/contacts/?page=1");
        if (response.ok) {
          const data = await response.json();
          content = renderContacts(data);

        } else {
          content = "Failed to fetch All Contacts.";
        }
      } catch (error) {
        content = "An error occurred while fetching All Contacts.";
      }
    } else if (identifier === "us") {
      try {
        const response = await fetch("https://contact.mediusware.com/api/contacts/?page=3");
        if (response.ok) {
          const data = await response.json();
          content = renderContacts(data);
        } else {
          content = "Failed to fetch US Contacts.";
        }
      } catch (error) {
        content = "An error occurred while fetching US Contacts.";
      }
    }
  

    setNestedModalContent({
      title,
      content,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeNestedModal = () => {
    setNestedModalOpen(false);
  };

  const modalContentInitialState = {
    title: "",
    content: null,
  };

  const [modalContent, setModalContent] = useState(modalContentInitialState);

  const renderButtons = (identifier) => {
    return (
      <div className="d-flex justify-content-between">
        <button
          className="btn text-light"
          style={{ background: "#46139F" }}
          onClick={() => openNestedModal("All Contacts", identifier)}
          key="all"
        >
          All Contacts
        </button>
        <button
          className="btn text-light"
          style={{ background: "#FF75F0" }}
          onClick={() => openNestedModal("US Contacts", identifier)}
          key="us"
        >
          US Contacts
        </button>
        <button
          style={{
            background: "white",
            border: "1px solid #46139f",
            borderRadius: "5px",
          }}
          onClick={closeModal}
          key="close"
        >
          Close
        </button>
      </div>
    );
  };


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() =>
                openModal("Modal A", renderButtons("all"))
              }
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() =>
                openModal("Modal B", renderButtons("us"))
              }
          >
            US Contacts
          </button>
        </div>
      </div>
      <DynamicModal
        isOpen={modalOpen}
        title={modalContent.title}
        content={modalContent.content}
      />
      {nestedModalContent && (
        <NestedModal
          isOpen={nestedModalOpen}
          title={nestedModalContent.title}
          content={nestedModalContent.content}
          closeModal={closeNestedModal}
        />
      )}
    </div>
  );
};

export default Problem2;
