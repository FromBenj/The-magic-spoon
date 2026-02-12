export class Spoon {
    constructor(ingredient, weight, weightUnit, volume, volumeUnit) {
        this.ingredient = ingredient;
        this.weight = weight;
        this.weightUnit = weightUnit;
        this.volume = volume;
        this.volumeUnit = volumeUnit;
    }

    isValid() {
        return (
            this.isIngredientValid() &&
            this.isWeightValid() &&
            this.isVolumeValid()
        );
    }

    isIngredientValid() {
        return (
            typeof this.ingredient === "string" && this.ingredient.length > 0
        )
    }

    isWeightValid() {
        if (this.weight === null && this.volume && this.volumeUnit) {
            return true;
        }

        if (
            this.weight && typeof this.weight === "number" && this.weight > 0 &&
            this.weightUnit && typeof this.weightUnit === "string" && this.weightUnit.length > 0
        ) return true;

        return this.weight && typeof this.weight === "number" && this.weight > 0;
    }

    isVolumeValid() {
        if (this.volume === null && this.weight && this.weightUnit) {
            return true;
        }

        return (
            typeof this.volume === "number" && this.volume > 0 &&
            typeof this.volumeUnit === "string" && this.volumeUnit.length > 0
        )
    }
}
