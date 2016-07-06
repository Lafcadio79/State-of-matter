import java.util.Vector;
import java.text.DecimalFormat;
public class ParticlesMovementTest2 {
	public static void main(String[] args){

		Vector<Particle> v = new Vector<Particle>();
		Vector<Double> x = new Vector<Double>();
		Vector<Double> y = new Vector<Double>();

		DecimalFormat df = new DecimalFormat("##.##");

		v.add(new Particle(0,0));

		System.out.println("X\tY\n" + v.get(0).getX() + "\t " + v.get(0).getY());

		for(int i = 0; i < 500; i++){
			v.get(0).movement();

			x.add(v.get(0).getX());
			y.add(v.get(0).getY());
		}


		for(double a : x){
			String ed = df.format(a);
			System.out.printf("%s\n", ed);
		}

		System.out.println("\n\n---------------");

		for(double a : y){
			String ed = df.format(a);
			System.out.printf("%s\n", ed);
		}

	}
}
