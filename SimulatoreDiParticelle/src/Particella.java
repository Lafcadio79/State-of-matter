
public class Particella {

	private double x;
	private double y;
	private double fast;


	public Particella(double x, double y){
		this.x = x;
		this.y = y;
	}

	public Particella(double x, double y, double fast){
		this(x,y);
		this.fast = fast;
	}

	public double getX(){
		return x;
	}

	public double getY(){
		return y;
	}

	public double getFast(){
		return fast;
	}

	public void setX(double x){
		this.x = x;
	}

	public void setY(double y){
		this.y = y;
	}

	public void setFast(double fast){
		this.fast = fast;
	}

	public String toString(){
		return "x: " + this.x + "\ny: " + this.y + "\nfast: " + this.fast;
	}

}