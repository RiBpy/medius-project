import React from 'react';

const DynamicModal = ({ isOpen, title, content }) => {

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;