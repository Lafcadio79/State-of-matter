
public class Particle {

	private double x;
	private double y;
	private double speed;

	public Particle(){
	}

	public Particle(double x, double y){
		this.x = x;
		this.y = y;
	}

	public Particle(double x, double y, double speed){
		this(x,y);
		this.speed = speed;
	}

	public double getX(){
		return x;
	}

	public double getY(){
		return y;
	}

	public double getSpeed(){
		return speed;
	}

	public void setX(double x){
		this.x = x;
	}

	public void setY(double y){
		this.y = y;
	}

	public void setSpeed(double speed){
		this.speed = speed;
	}

	/*
	 * This method takes an integer as alpha angle and
	 *it assigns, for x and y, the new calculated coordinates.
	 */
	public void movement(int angle){
		this.setX(this.x + Math.cos(angle));
		this.setY(this.y + Math.sin(angle));
	}

	/*
	 * This method does not take any argument but
	 * computes both new coordinates by default formula
	 */
	public void movement(){
		this.setX(this.x + 1-2* Math.random());
		this.setY(this.y + 1-2* Math.random());
		}

	public String toString(){
		return "\tx: " + this.x + "\ty: " + this.y;
	}

	public String printParams(){
		return "x: " + this.x + "\ny: " + this.y + "\nspeed: " + this.speed;
	}

}
