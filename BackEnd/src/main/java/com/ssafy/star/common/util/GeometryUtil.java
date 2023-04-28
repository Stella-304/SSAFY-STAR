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
    class Edge implements Comparable<Edge> {
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
        if (cardCnt <= 8)
            return 1;
        if (cardCnt <= 25)
            return 2;
        if (cardCnt <= 100)
            return 3;
        if (cardCnt <= 400)
            return 4;
        if (cardCnt <= 1250)
            return 5;
        return 6;
    }
    public static int getVerticesFromLevel(int level) {
        if (level==1)
            return 12;
        if (level==2)
            return 32;
        if (level==3)
            return 162;
        if (level==4)
            return 642;
        if (level==5)
            return 2562;
        return 10242;
    }
    public static int getRadiusFromLevel(int level){
        if (level==1)
            return 1;
        if (level==2)
            return 1;
        if (level==3)
            return 2;
        if (level==4)
            return 2;
        if (level==5)
            return 4;
        return 4;
    }
    private static int[] parents=new int[5057];
    public List<EdgeDto> getEdgeList(List<CardDetailDto> cards){
        long first=cards.get(0).getCardId();
        for(int i=0;i<parents.length;i++){
            parents[i]=i;
        }
        List<EdgeDto> list=new ArrayList<>();
        List<Edge> edges=new ArrayList<>();
        double x1=cards.get(0).getX();
        Math.pow(x1,x1);
        int cardCnt=cards.size();
        for(int i=0;i<cardCnt-1;i++){
            for(int j=i+1;j<cardCnt;j++){
                edges.add(new Edge(i,j
                        ,Math.sqrt(Math.pow(cards.get(i).getX()-cards.get(j).getX(),2)
                        +Math.pow(cards.get(i).getY()-cards.get(j).getY(),2)
                )));
            }
        }
        Collections.sort(edges);
        int cnt=0;

        for(Edge edge : edges) {
            if(union((int)edge.a,(int)edge.b)) {
                list.add(new EdgeDto((long)(first+edge.a),(long)(first+edge.b)));
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
