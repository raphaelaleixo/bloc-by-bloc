export default class CountdownTank {
    value: number = 10;
    advance() {
        this.value = this.value - 1;
        return this;
    }
    goBack() {
        this.value = this.value + 1;
        return this;
    }
}