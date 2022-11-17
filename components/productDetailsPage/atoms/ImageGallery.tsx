import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Image } from "react-grid-gallery";

import { getImageItems } from '../../../utils';
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

interface CustomImage extends Image {
  original: string;
}

interface IPDPGallery {
  imgSet?: string[]
}

const PDPGallery = ({imgSet}: IPDPGallery) => {
  const [index, setIndex] = useState(-1);
  const images = getImageItems(imgSet)

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number, item: CustomImage) => {
    setIndex(index)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 100)
  };
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);


  return (
    <Box>
     <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
      />
      {!!currentImage && (
        <Lightbox
          mainSrc={currentImage.src}
          imageTitle={currentImage.caption}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.original}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.original}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </Box>
  )
}

export default PDPGallery