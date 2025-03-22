import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import GalleryImg1 from "../../assets/images/gallery/g1.jpg";
import GalleryImg3 from "../../assets/images/gallery/g3.jpg";
import GalleryImg4 from "../../assets/images/gallery/g4.jpg";
import GalleryImg6 from "../../assets/images/gallery/g6.jpg";
import GalleryImg7 from "../../assets/images/gallery/g7.jpg";

const Gallery = () => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { src: GalleryImg1, alt: "Person wearing shoes" },
        { src: GalleryImg3, alt: "Blonde woman wearing sunglasses" },
        { src: GalleryImg6, alt: "Random image" },
        { src: GalleryImg4, alt: "Jaipur, Rajasthan India" },
        { src: GalleryImg7, alt: "Verne Ho" },
        { src: GalleryImg6, alt: "Rann of Kutch, India" },
    ];

    return (
        <div>
            <h2>Bộ sưu tập ảnh</h2>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img.src}
                        alt={img.alt}
                        style={{ width: "150px", cursor: "pointer", borderRadius: "8px" }}
                        onClick={() => {
                            setCurrentIndex(index);
                            setOpen(true);
                        }}
                    />
                ))}
            </div>

            {open && (
                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={images}
                    index={currentIndex}
                />
            )}
        </div>
    );
};

export default Gallery;
