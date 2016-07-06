package Tests;

public class Test {
	public static void main(String[] args){
		int i,cont = 0;

		int odd = 0,even = 0;

		while(true){
			i = (int) Math.round(Math.random());
			if (i == 0)
				odd++;
			else
				even++;
			cont++;
			if(cont == 1000) break;

		}

		System.out.println("Odd:\t " + odd + "\nEven:\t " + even);
	}
}
