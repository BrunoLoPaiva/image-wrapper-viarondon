import React, { useState } from "react";
import html2canvas from "html2canvas";
import styles from "../css/wrapper.module.css";
import ImagePasteArea from "./modules/ImagePasteArea";

const Wrapper = () => {
  const [darkMode, setDarkMode] = useState(true);
  document.body.classList.toggle("dark-mode", darkMode);

  const handleExport = () => {
    const confirmExport = window.confirm(
      "Tem certeza que deseja exportar as imagens?"
    );
    if (!confirmExport) {
      return;
    }
    const imageListElement = document.getElementById("imageList");
    if (imageListElement) {
      html2canvas(imageListElement, { scale: 2 })
        .then((canvas) => {
          const image = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = image;
          link.download = "exported-image.png";
          link.click();
        })
        .catch((err) => {
          console.error("Failed to export images:", err);
        });
    }
  };

  const handleThemeToggle = () => {
    document.body.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.topBar}>
        <button className={styles.exportButton} onClick={handleExport}>
          Exportar
        </button>
        <button className={styles.themeButton} onClick={handleThemeToggle}>
          {darkMode ? "Modo Claro" : "Modo Escuro"}
        </button>
      </div>
      <ImagePasteArea />
    </section>
  );
};

export default Wrapper;
