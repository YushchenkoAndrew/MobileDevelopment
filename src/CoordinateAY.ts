export type Direction = "Longitude" | "Latitude";
export type CompassPoint = "N" | "W" | "E" | "S";

export interface CoordinateValue {
  degree?: number;
  minutes?: number;
  seconds?: number;
  compass?: CompassPoint;
}

export default class CoordinateAY implements CoordinateValue {
  degree: number;
  minutes: number;
  seconds: number;
  compass: CompassPoint;
  direction: Direction;

  // In Typescript you can't do polymorphism but you can simulate
  // it behavior as shown bellow
  constructor({ degree = 0, minutes = 0, seconds = 0, compass = "N" }: CoordinateValue) {
    // Checker of input data
    if (Math.abs(degree) > 90) throw Error("Range of degree is incorrect");
    if (Math.abs(minutes) > 180) throw Error("Range of minutes is incorrect");
    if (seconds < 0 || seconds > 59) throw Error("Range of seconds is incorrect");

    this.degree = degree;
    this.minutes = minutes;
    this.seconds = seconds;
    this.compass = compass;
    this.direction = compass == "N" || compass == "S" ? "Longitude" : "Latitude";
  }

  convertToDecimal() {
    return (this.degree + this.minutes / 60 + this.seconds / 3600) * (this.compass == "S" || this.compass == "W" ? -1 : 1);
  }

  calcMiddle(endPoint: CoordinateAY): CoordinateAY | null {
    if (endPoint.direction != this.direction) return null;

    const degree = (this.degree + endPoint.degree) / 2;
    const minutes = (this.minutes + endPoint.minutes) / 2;
    const seconds = (this.seconds + endPoint.seconds) / 2;
    let compass: CompassPoint;

    if (this.direction == "Longitude") compass = degree > 0 ? "N" : "S";
    else compass = degree > 0 ? "E" : "W";

    return new CoordinateAY({ degree, minutes, seconds, compass });
  }

  toString(): string {
    return `${this.degree}°${this.minutes}'${this.seconds}"${this.compass}`;
  }

  toStringDecimal(): string {
    return `${this.convertToDecimal()}°`;
  }
}
