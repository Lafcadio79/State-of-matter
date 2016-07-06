import java.util.Vector;

public class ParticlesMovementTest {
	public static void main(String[] args){

	Vector<Particle> v = new Vector<Particle>();

	int s;

	v.add(new Particle(10,10));
	v.add(new Particle(-20,10));
	v.add(new Particle(10,20));
	v.add(new Particle(20,20));

	System.out.println(v);

	for(int i = 0; i < 500; i++){
		for(Particle p : v){
			s = (int) Math.round(Math.random()*360);
			p.movement(s);
		}
		System.out.println(v);
	}

	}
}
