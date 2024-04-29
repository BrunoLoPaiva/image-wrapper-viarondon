import React from 'react';
import html2canvas from 'html2canvas';
import styles from '../css/wrapper.module.css';
import ImagePasteArea from './modules/ImagePasteArea';

const Wrapper = () => {
  const handleExport = () => {
    const confirm = window.confirm('Tem certeza que deseja exportar as imagens?');
    if (!confirm) {
      return;
    }
    const imageListElement = document.getElementById('imageList');
    console.log(`.${styles.imageList}`)
    if (imageListElement) {
      html2canvas(imageListElement, { scale: 2 })
        .then(canvas => {
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = 'exported-image.png';
          link.click();
          
        })
        .catch(err => {
          console.error('Failed to export images:', err);
        });
    }
  };

  return (
    <section className={styles.wrapper}>
      <ImagePasteArea />
      <button className={styles.exportButton} onClick={handleExport}>Exportar</button>
      <div className={styles.footer}>
        Criado por Pedro Flores. 04/2024
      </div>
    </section>
  );
}

export default Wrapper;
