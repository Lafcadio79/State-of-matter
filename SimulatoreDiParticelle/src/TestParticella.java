import java.util.Vector;

public class TestParticella {
	public static void main(String[] args){

		Vector<Particella> v1 = new Vector<Particella>();

		for(int i = 1; i <= 4; i++){
			Particella p = new Particella(0,i, Math.random()*5);
			v1.add(p);
		}

		while(!haVinto(v1)){
			for(Particella p : v1)
				p.setX(p.getX()+p.getFast());
		}

		for(Particella p : v1)
			System.out.println(p.getX());

	}

	private static boolean haVinto(Vector<Particella> v){
		for(Particella p : v){
			if(p.getX() > 100)
				return true;
		}
		return false;
	}

}
