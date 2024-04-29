import React, { useState } from 'react';
import styles from '../../css/imagePasteArea.module.css'; // Certifique-se de ter o CSS necessário
import { FaTrash } from "react-icons/fa";

const ImagePasteArea = () => {
  const [images, setImages] = useState([]);
  const [pasteAreaStyle, setPasteAreaStyle] = useState(0);

  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let item of items) {
      if (item.type.startsWith('image')) {
        const file = item.getAsFile();
        const imageUrl = URL.createObjectURL(file);
        setImages(prevImages => [...prevImages, imageUrl]);
      }
    }
  };

  const deleteImage = (index, event) => {
    if (!event.ctrlKey && !window.confirm('Tem certeza que deseja excluir esta imagem?')) {
      return;
    }
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("imageIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessário para permitir o drop
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData("imageIndex");
    e.preventDefault(); // Impede o comportamento padrão

    const newImages = [...images];
    const draggedImage = newImages[dragIndex];
    newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    setImages(newImages);
  };

  return (
    <div className={styles.container} onPaste={handlePaste}>
      <div className={styles.pasteArea}>Cole suas imagens aqui!</div>
      <div className={styles.imageHolder} id='imageList'>
        <div className={`${styles.imageList} ${pasteAreaStyle === 0 ? styles.imageList1 : styles.imageList2}`}>
          {images.map((image, index) => (
            <div key={index} className={styles.imageWrapper} draggable="true"
                 onDragStart={(e) => handleDragStart(e, index)}
                 onDragOver={handleDragOver}
                 onDrop={(e) => handleDrop(e, index)}>
              <div className={styles.hoverEffect}>
                <span onClick={(event) => deleteImage(index, event)}>
                  <FaTrash />
                </span>
              </div>
              <img src={image} alt={`Pasted ${index}`} />
            </div>
          ))}
        </div>
        <textarea>Teste</textarea>
      </div>
      <button onClick={() => setPasteAreaStyle(pasteAreaStyle === 0 ? 1 : 0)}>Trocar Estilo</button>
    </div>
  );
};

export default ImagePasteArea;
