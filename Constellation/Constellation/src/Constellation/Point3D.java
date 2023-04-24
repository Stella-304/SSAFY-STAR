package Constellation;

public class Point3D {
	private double x, y, z;

    public Point3D(double x, double y, double z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public Point3D(double[] coords) {
        this.x = coords[0];
        this.y = coords[1];
        this.z = coords[2];
    }
    

    public double getX() {
		return x;
	}

	public double getY() {
		return y;
	}

	public double getZ() {
		return z;
	}


}
