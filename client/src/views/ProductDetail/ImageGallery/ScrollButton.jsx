


// functionality:
  // whether to appear
  // on click

  // state:
    // if there's another item in the linked list
      // current index
      // length of list


      // could either change ui - i.e. just translate carousel the width of one item
        // don't know when button should disappear unless i put some kind of marker (end of linked list)
         // and either subsribe to it or checked every every change
      // could keep track of end and beginning index
        // because already keeping track of this in my related components, going to keep

  // if first element visible, forward button hidden
  // if last element visible, back button hidden

  // otherwise translate visible array by one in the chosen direction

    // if the resulting array contains an element not visible, translate by two

{/* <Buttons
        scroll
        onClick={() => handleScroll(-1)}
        style={{ display: firstPhotoIndex === 0 ? 'none' : '' }}
      >
        <MdExpandLess style={{ fontSize: '1.25em' }} />
      </Buttons> */}



      // TEST HOW LONG IT TAKES TO VIEW THE GALLERY OF IMAGES WITH PEREVIOUS CODE
      // (KEEPING A PLACE STATE AND NOT USING THE NATIVE SCROLL)
      // COMPARED TO USING SCROLL AND CSS TO TRANSLATE CAROUSEL INSTEAD OF MAINTAINING A CURRENT INDEX STATE

