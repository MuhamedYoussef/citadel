// Active property state
let activeState = {
  layer: null,
  area: null,
  isFeatured: false,
  features: null,
  routes: []
};


// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});



// Right side panel control
class PanelControl {

  constructor(panel) {
    this.panelHTML = panel;
  }


  show(feature, layer) {
    this.panelHTML.style.right = 0;
    this.resetFeatured()
    this.fillData(feature, layer);
  }


  hide() {
    this.panelHTML.style.right = '-25rem';
    // this.resetData()
    this.resetFeatured()
  }


  fillData(feature, layer) {
    // A little edit before filling the data
    const {pk, price} = feature.properties;

    if (typeof price == 'number') {
      feature.properties.price = formatter.format(price)
    }

    // Fill the panel
    Object.keys(feature.properties).forEach(key => {
      const element = this.panelHTML.querySelector(`.${key}`);

      if (element) {
        element.innerText = feature.properties[key]
      }
    })


    this.panelHTML.querySelectorAll('.featureProperty').forEach(elem => elem.dataset.id = pk)
  }


  resetFeatured() {
    if (activeState.area) activeState.area.remove()
    if (activeState.features) activeState.features.remove()
    activeState.routes.forEach(route => route.remove())

    activeState = {...activeState, area: null, isFeatured: false, features: null, routes: []}
  }

}

const panelControl = new PanelControl(document.querySelector('.panel'));