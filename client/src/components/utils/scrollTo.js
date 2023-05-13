// ref at marker

const ob = new IntersectionObserver(obCallback, {
  root: terms,
  threshold: 1,
});
ob.observe(watch);

function obCallback(payload) {
  console.log(payload[0].isIntersecting);
  if (payload[0].intersectionRatio === 0.95) {
  setPlace(payload[0].currentTarget.index);
  }
};



function obCallback(payload) {
  console.log(payload[0].intersectionRatio);
}
const ob = new IntersectionObserver(obCallback, {
  root: terms,
  threshold: 1,
});
ob.observe(terms.lastElementChild);

function obCallback(payload) {
  if (payload[0].intersectionRatio === 0.85) {
    button.disabled = false;
  }
}