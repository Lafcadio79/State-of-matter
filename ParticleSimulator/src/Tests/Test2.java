package Tests;

public class Test2 {
	public static void main(String[] args){

		int angle = (int) Math.round(Math.random()*360);

		double cos = Math.cos(angle);
		double sin = Math.sin(angle);

		System.out.println("Angle: " + angle + "\nCoseno: " + cos + "\nSeno: " + sin +
				"\nPitagora: " + (Math.pow(cos, 2) + Math.pow(sin, 2)));


	}
}
