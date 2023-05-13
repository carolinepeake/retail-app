


<Main
id={photo.url}
//  src={selectedStyle.photos[place || 0].url}
src={selectedStyle.photos[index].url}
alt={`${productInfo.name} in ${selectedStyle.name} style photo number ${index}`}
status={status}
place={place}
onMouseMove={(e) => handlePanImage(e)}
xPercent={xPerc}
yPercent={yPerc}
/>