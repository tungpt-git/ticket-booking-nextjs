export const FOODS_DESCRIPTION = Object.freeze({
  POPCORN: "1 bỏng tùy chọn thường/caramel/phô mai",
  DRINK: "1 nước tùy chọn pepsi/7up/mirranda/lipton chanh",
  COMBO: "Combo 1 bỏng và 1 nước",
});

export type PopcornData = {
  classic: number;
  cheese: number;
  caramel: number;
};

export type DrinkData = {
  pepsi: number;
  _7up: number;
  miranda: number;
  lipton: number;
};
