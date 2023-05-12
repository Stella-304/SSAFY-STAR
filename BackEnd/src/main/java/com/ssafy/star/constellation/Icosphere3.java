package com.ssafy.star.constellation;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;
import java.io.*;


public class Icosphere3 {
    public static List<Point3D> vertices = new ArrayList<>();
    private static List<Triangle>[] faces = new ArrayList[6];
    private static int index;

    private static int[] length = { 12, 42, 162, 642, 2562, 10242 };

    private static Map<Long, Integer> middlePointIndexCache = new HashMap<>();

    static {
        for (int i = 0; i < 6; i++) {
            faces[i] = new ArrayList<>();
        }
        makeIcosahedron();

        for (int i = 1; i < 6; i++) {
            subdivise(i);
            int sum=0;
            for(int j=0;j<vertices.size();j++){
                if(vertices.get(j).getY()>0){
                    sum++;
                }
            }
        }
        //아래반구 지우기
        int i=0;
        Stack<Point3D> stk=new Stack<>();
        for (Point3D p : vertices) {
            if(p.getY()<=0){
                stk.add(p);
                i++;
            }
        }
        while(!stk.isEmpty()){
            vertices.remove(stk.pop());
        }
        Collections.sort(vertices);
    }

    private static void subdivise(int level) {
        for (Triangle tri : faces[level - 1]) {
            // replace triangle by 4 triangles
            int a = getMiddlePoint(tri.v1, tri.v2);
            int b = getMiddlePoint(tri.v2, tri.v3);
            int c = getMiddlePoint(tri.v3, tri.v1);

            faces[level].add(new Triangle(tri.v1, a, c));
            faces[level].add(new Triangle(tri.v2, b, a));
            faces[level].add(new Triangle(tri.v3, c, b));
            faces[level].add(new Triangle(a, b, c));
        }
    }

    private static int addVertex(Point3D p) {
        double length = Math.sqrt(p.getX() * p.getX() + p.getY() * p.getY() + p.getZ() * p.getZ());
        vertices.add(new Point3D(p.getX() / length, p.getY() / length, p.getZ() / length));
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

    private static void makeIcosahedron() {
        double t = (1.0 + Math.sqrt(5.0)) / 2.0;
        addVertex(new Point3D(-1, t, 0));
        addVertex(new Point3D(1, t, 0));
        addVertex(new Point3D(-1, -t, 0));
        addVertex(new Point3D(1, -t, 0));

        addVertex(new Point3D(0, -1, t));
        addVertex(new Point3D(0, 1, t));
        addVertex(new Point3D(0, -1, -t));
        addVertex(new Point3D(0, 1, -t));

        addVertex(new Point3D(t, 0, -1));
        addVertex(new Point3D(t, 0, 1));
        addVertex(new Point3D(-t, 0, -1));
        addVertex(new Point3D(-t, 0, 1));

        // create 20 triangles of the icosahedron

        // 5 faces around point 0
        faces[0].add(new Triangle(0, 11, 5));
        faces[0].add(new Triangle(0, 5, 1));
        faces[0].add(new Triangle(0, 1, 7));
        faces[0].add(new Triangle(0, 7, 10));
        faces[0].add(new Triangle(0, 10, 11));

        // 5 adjacent faces
        faces[0].add(new Triangle(1, 5, 9));
        faces[0].add(new Triangle(5, 11, 4));
        faces[0].add(new Triangle(11, 10, 2));
        faces[0].add(new Triangle(10, 7, 6));
        faces[0].add(new Triangle(7, 1, 8));

        // 5 faces around point 3
        faces[0].add(new Triangle(3, 9, 4));
        faces[0].add(new Triangle(3, 4, 2));
        faces[0].add(new Triangle(3, 2, 6));
        faces[0].add(new Triangle(3, 6, 8));
        faces[0].add(new Triangle(3, 8, 9));

        // 5 adjacent faces
        faces[0].add(new Triangle(4, 9, 5));
        faces[0].add(new Triangle(2, 4, 11));
        faces[0].add(new Triangle(6, 2, 10));
        faces[0].add(new Triangle(8, 6, 7));
        faces[0].add(new Triangle(9, 8, 1));
    }

}
