package com.ssafy.star.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.dto.response.EdgeDto;
import com.ssafy.star.constellation.Point3D;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class GeometryUtil {
    static class Edge implements Comparable<Edge> {
        long a;
        long b;
        double distance;

        public Edge(long a, long b, double distance) {
            this.a = a;
            this.b = b;
            this.distance = distance;
        }

        @Override
        public int compareTo(Edge o) {
            return Double.compare(this.distance,o.distance);
        }
    }
    public static int getLevelFromCardCnt(int cardCnt) {
        if (cardCnt <= 4)
            return 1;
        if (cardCnt <= 10)
            return 2;
        if (cardCnt <= 40)
            return 3;
        if (cardCnt <= 200)
            return 4;
        if (cardCnt <= 600)
            return 5;
        return 6;
    }
    public static int getVerticesFromLevel(int level) {
        if (level==1)
            return 4;
        if (level==2)
            return 17;
        if (level==3)
            return 73;
        if (level==4)
            return 305;
        if (level==5)
            return 1249;
        return 5057;
    }
    private static int[] parents=new int[5057];
    public static List<EdgeDto> getEdgeList(List<CardDetailDto> cards){
        for(int i=0;i<parents.length;i++){
            parents[i]=i;
        }
        List<EdgeDto> list=new ArrayList<>();
        List<Edge> edges=new ArrayList<>();

        int cardCnt=cards.size();
        for(int i=0;i<cardCnt-1;i++){
            double length = Math.sqrt(cards.get(i).getX() * cards.get(i).getX() + cards.get(i).getY() * cards.get(i).getY() + cards.get(i).getZ() * cards.get(i).getZ());
            double x1=cards.get(i).getX() / length;
            double y1=cards.get(i).getY() / length;
            double z1=cards.get(i).getZ() / length;

            for(int j=i+1;j<cardCnt;j++){
                length = Math.sqrt(cards.get(j).getX() * cards.get(j).getX() + cards.get(j).getY() * cards.get(j).getY() + cards.get(j).getZ() * cards.get(j).getZ());
                double x2=cards.get(j).getX() / length;
                double y2=cards.get(j).getY() / length;
                double z2=cards.get(j).getZ() / length;
                double distance=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2)+Math.pow(z1-z2,2));
                edges.add(new Edge(i,j,distance));
            }
        }
        Collections.sort(edges);
//        edges.stream().forEach(x->{System.out.println(x.distance);});
        int cnt=0;

        for(Edge edge : edges) {
            if(union((int)edge.a,(int)edge.b)) {
//                System.out.println(edge.distance);
                list.add(new EdgeDto(cards.get((int)edge.a).getCardId(),cards.get((int)edge.b).getCardId()));
                if(++cnt==cardCnt-1) break;
            }
        }
        return list;
    }
    private static boolean union(int a, int b) {
        int aRoot=find(a);
        int bRoot=find(b);

        if(aRoot==bRoot) return  false;

        parents[bRoot]=aRoot; //b 집합을 a집합에 포함시켜버려
        return true;
    }

    private static int find(int a) {//a의 대표자 찾기
        if(parents[a]==a) return a;
        return parents[a]=find(parents[a]); //우리의 대표자를 나의 부모로 만듬 plus Path Compression까지 해줘.
    }
}
