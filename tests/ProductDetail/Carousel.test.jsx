// input props:
  // scrollSize
  // galleryWidth
  // listLength
  //


  // state changes
    // forward & backward
      // scrollSize = 1, galleryWidth = ?, currentIndex = 2, listLength = 8 : outfits list
      // scrollSize = galleryWidth = ?, listLength = 8,  currentInd = 6 : related items w/ remainingItems < galleryWidth
      // carousels do not go past end of list
      // maintains correct state on resize
      // : image gallery
        // : thumbnail icons
          // : clicking icon
            // currentIndex = mainImage = thumbnailIcon
          // scrolling image gallery
            // currentIndex
            // active thumbnail icon
      // maintains correct currentIndex state when changing status state
       // maintains correct currentIndex state when changing product or style
      // maintains correct state on resize
        // image icons
          // arrowClick doesn't change currentIndex if image icon at currentIndex visible
          // changes currentIndex and firstPhotoIndex if imageIcon at currentIndex becomes hidden
            // firstPhotoIndex of thumbnail images correct
            // currentIndex correct
        // maintains correct state on resize
      // arrows UI and UX