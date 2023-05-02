package com.ssafy.star.constellation;

public class Point3D implements Comparable<Point3D>{
	public double x, y, z;

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

	@Override
	public int compareTo(Point3D o) {
		return Double.compare(o.y,this.y)==0?Double.compare(this.x,o.x):Double.compare(o.y,this.y);
	}

	@Override
	public String toString() {
		return "Point3D{" +
				"x=" + x +
				", y=" + y +
				", z=" + z +
				'}';
	}
}
