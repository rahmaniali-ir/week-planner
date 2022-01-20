const colors = ['#2abc62', '#eb4a62', '#784ee0'];

export class Color {
  static random() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
