import { useState } from 'react';

export default function useModal() {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  return [showModal, toggleModal];
}
