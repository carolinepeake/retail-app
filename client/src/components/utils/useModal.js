import { useState } from 'react';

export default function useModal() {
  const [showModal, setShowModal] = useState(false);
  console.log('toggling modal in useModal');

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  return [showModal, toggleModal];
}
