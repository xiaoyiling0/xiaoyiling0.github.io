
const cubism4Model =
  "./动态(1)0.model3.json";

(async function main() {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    resizeTo: window
  });

  const model4 = await PIXI.live2d.Live2DModel.from(cubism4Model);

  app.stage.addChild(model4);
})();
