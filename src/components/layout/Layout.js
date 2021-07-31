import { useState } from 'react';

import Header from './Header';
import Modal from '../auth/Modal';
import Backdrop from '../auth/Backdrop';
import classes from './Layout.module.css';

function Layout(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <Header propsFunction={openModalHandler} />
      <main className={classes.main}>{props.children}</main>
      {modalIsOpen && <Modal />}
      {modalIsOpen && <Backdrop onClose={closeModalHandler} />}
    </div>
  );
}

export default Layout;
