package com.ssafy.star.constellation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;


public class Icosphere {
	static int faceCnt=32;
	private static List<Point3D> vertices = new ArrayList<>();
	private static List<Triangle>[][] faces = new ArrayList[32][6];
	private static List<Triangle>[] tmpFaces = new ArrayList[2];
	private static int index;

	private static Map<Long, Integer> middlePointIndexCache = new HashMap<>();
	private static Map<Integer, Integer> counter = new HashMap<>();
	public static List<List<Point3D>> list_32 =new ArrayList<>();

	public static List<Point3D> list_8_center=new ArrayList<>();
	public static List<Point3D> list_32_center=new ArrayList<>();

	static {
		for(int i=0;i<2;i++){
			tmpFaces[i]=new ArrayList<>();
		}
		for(int i=0;i<32;i++){
			list_32.add(new ArrayList<>());
		}
		for(int j=0;j<faceCnt;j++){
			for (int i = 0; i < 6; i++) {
				faces[j][i] = new ArrayList<>();
			}
		}
		makeIcosahedron();
		for(Triangle tri:tmpFaces[0]){
			int a = getMiddlePoint(tri.v1, tri.v2);
			int b = getMiddlePoint(tri.v2, tri.v3);
			int c = getMiddlePoint(tri.v3, tri.v1);

			tmpFaces[1].add(new Triangle(tri.v1, a, c));
			tmpFaces[1].add(new Triangle(tri.v2, b, a));
			tmpFaces[1].add(new Triangle(tri.v3, c, b));
			tmpFaces[1].add(new Triangle(a, b, c));
			list_8_center.add(getMiddlePoint(tri.v1,tri.v2,tri.v3));
		}
		for(Triangle tri:tmpFaces[1]){
			list_32_center.add(getMiddlePoint(tri.v1,tri.v2,tri.v3));
		}
		int k=0;
		for(Triangle t:tmpFaces[1]){
			faces[k++][0].add(t);
		}
		for (int i = 1; i < 6; i++) {
			subdivise(i);
		}

		for(int i=0;i<faceCnt;i++){
			counter.clear();
			for(Triangle t : faces[i][4] ){
				counter.put(t.v1,counter.getOrDefault(t.v1,0)+1);
				counter.put(t.v2,counter.getOrDefault(t.v2,0)+1);
				counter.put(t.v3,counter.getOrDefault(t.v3,0)+1);
			}
			Stack<Point3D> stk=new Stack<>();
			for(Integer key : counter.keySet()){
				if(counter.get(key)==6){
					stk.add(vertices.get(key));
				}
			}
			// System.out.println(stk.size());
			while(!stk.isEmpty()){
				list_32.get(i).add(stk.pop());
			}
		}

	}

	private static void subdivise(int level) {
		for(int i=0;i<faceCnt;i++){
			for (Triangle tri : faces[i][level - 1]) {
				// replace triangle by 4 triangles
				int a = getMiddlePoint(tri.v1, tri.v2);
				int b = getMiddlePoint(tri.v2, tri.v3);
				int c = getMiddlePoint(tri.v3, tri.v1);

				faces[i][level].add(new Triangle(tri.v1, a, c));
				faces[i][level].add(new Triangle(tri.v2, b, a));
				faces[i][level].add(new Triangle(tri.v3, c, b));
				faces[i][level].add(new Triangle(a, b, c));
			}
		}

	}

	private static int addVertex(Point3D p) {
		//구 위에 점으로 바꾸는과정
		double length = Math.sqrt(p.getX() * p.getX() + p.getY() * p.getY() + p.getZ() * p.getZ());
		vertices.add(new Point3D(p.getX() / length, p.getY() / length, p.getZ() / length));
		//        vertices.add(p);
		return index++;
	}

	private static int getMiddlePoint(int p1, int p2) {
		// first check if we have it already
		boolean firstIsSmaller = p1 < p2;
		long smallerIndex = firstIsSmaller ? p1 : p2;
		long greaterIndex = firstIsSmaller ? p2 : p1;
		long key = (smallerIndex << 32) + greaterIndex;

		Integer ret;
		if (middlePointIndexCache.containsKey(key)) {
			ret = middlePointIndexCache.get(key);
			return ret;
		}

		// not in cache, calculate it
		Point3D point1 = vertices.get(p1);
		Point3D point2 = vertices.get(p2);
		Point3D middle = new Point3D((point1.getX() + point2.getX()) / 2.0, (point1.getY() + point2.getY()) / 2.0,
			(point1.getZ() + point2.getZ()) / 2.0);

		// add vertex makes sure point is on unit sphere
		int i = addVertex(middle);

		// store it, return index
		middlePointIndexCache.put(key, i);
		return i;
	}

	private static Point3D getMiddlePoint(int p1, int p2,int p3) {
		// not in cache, calculate it
		Point3D point1 = vertices.get(p1);
		Point3D point2 = vertices.get(p2);
		Point3D point3 = vertices.get(p3);
		Point3D middle = new Point3D((point1.getX() + point2.getX()) + point3.getX() / 3.0, (point1.getY() + point2.getY() + point3.getY()) / 3.0,
			(point1.getZ() + point2.getZ() + point3.getZ()) / 3.0);
		double length = Math.sqrt(middle.getX() * middle.getX() + middle.getY() * middle.getY() + middle.getZ() * middle.getZ());
		Point3D realMiddle =new Point3D(middle.getX() / length, middle.getY() / length, middle.getZ() / length);
		return realMiddle;
	}

	private static void makeIcosahedron() {
		double t = (1.0 + Math.sqrt(5.0)) / 2.0;
		addVertex(new Point3D(0, -1, t));
		addVertex(new Point3D(0, 1, t));

		addVertex(new Point3D(-1, -t, 0));
		addVertex(new Point3D(1, -t, 0));
		addVertex(new Point3D(-1, t, 0));
		addVertex(new Point3D(1, t, 0));

		addVertex(new Point3D(-t, 0, 1));
		addVertex(new Point3D(t, 0, 1));


		tmpFaces[0].add(new Triangle(0, 2, 3));
		tmpFaces[0].add(new Triangle(0, 3, 7));
		tmpFaces[0].add(new Triangle(0, 1, 7));
		tmpFaces[0].add(new Triangle(0, 1, 6));
		tmpFaces[0].add(new Triangle(0, 6, 2));

		// 3 adjacent faces point1
		tmpFaces[0].add(new Triangle(1, 7, 5));
		tmpFaces[0].add(new Triangle(1, 5, 4));
		tmpFaces[0].add(new Triangle(1, 4, 6));

	}

}
