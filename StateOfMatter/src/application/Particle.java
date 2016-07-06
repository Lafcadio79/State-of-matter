package application;

import javafx.scene.shape.Sphere;

public class Particle {

	// variabili d'istanza
	private double x;
	private double y;
	private double z;
	private Sphere sphere;
	private double radius;
	private int state;

	// costruttore di default
	public Particle(){
	}

	// costruttore con stato predefinito
	public Particle(double x, double y, double z, double radius){
		this.x = x;
		this.y = y;
		this.z = z;
		this.sphere = new Sphere(radius);
		this.state = 0;
	}

	// costruttore con stato da definire
	public Particle (double x, double y, double z, double radius, int state){
		this(x, y, z, radius);
		this.state = state;
	}

	// metodi accessori
	public double getX(){
		return x;
	}

	public void setX(double x){
		this.x = x;
	}

	public double getY(){
		return y;
	}

	public void setY(double y){
		this.y = y;
	}

	public double getZ(){
		return z;
	}

	public void setZ(double z){
		this.z = z;
	}

	public int getState(){
		return state;
	}

	public Sphere getSphere(){
		return sphere;
	}

	public void setSphere(Sphere sphere){
		this.sphere = (Sphere) sphere;
	}

	public double getRadius(){
		return radius;
	}

	public void setRadius(double radius){
		this.radius = radius;
	}

	public void setState(int state){
		this.state = state;
	}

	// genera un numero casuale in un dato range
	public double rangeRandom(int min, int max, boolean round){
		if(!round)
			return Math.round(min + (Math.random()*(max-min)));
		else
			return min + (Math.random()*(max-min));
	}

	// muove la particella in funzione del suo stato
	// da definire perché inappropriato al nostro caso
	public void movement(int i){
		int angle = (int) rangeRandom(0,360, true);
		this.x += Math.round(Math.cos(angle)*i);
		switch(state){
			case 0: this.y += Math.round(Math.sin(angle)*i);
			 		this.z += Math.round(Math.sin(angle)*i);
			 		break;
			case 1: this.y += Math.round((Math.sin(angle)+1)*i);
					this.z += Math.round((Math.sin(angle)+1)*i);
					break;
			case 2: this.y += Math.round((Math.sin(angle)+1)*i);
					this.z += Math.round((Math.sin(angle)+1)*i);
					break;
		}
	}

	
	// restituisce l'area della particella
	public double area(){
		return 4.0*Math.PI*Math.pow(radius, 2);
	}

	// restituisce il volume della particella
	public double volume(){
		return (4.0/3.0)*Math.PI*Math.pow(radius, 3);
	}

	// override del metodo equals di Object
	public boolean equals(Object o){
		if(o instanceof Particle){
			Particle particle = (Particle) o;
			return this.x == particle.x && this.y == particle.y && this.z == particle.z;
		}
		else
			return false;
	}

	// stampa stato e coordinate della particella
	public String toString(){
		return "X\t" + this.x + "\nY\t" + this.y + "\nZ\t" + this.z + "\nState\t" + this.state;
	}

}
