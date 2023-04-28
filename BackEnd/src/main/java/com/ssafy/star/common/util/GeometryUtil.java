package com.ssafy.star.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.dto.response.EdgeDto;
import com.ssafy.star.constellation.Point3D;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class GeometryUtil {
    class Edge implements Comparable<Edge> {
        int a;
        int b;
        double distance;

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

//    public List<EdgeDto> getEdgeList(List<CardDetailDto> cards){
//        List<EdgeDto> list=new ArrayList<>();
//        List<Edge> edges=new ArrayList<>();
//        double x1=cards.get(0).getX();
//        Math.pow(x1,x1);
//        int cnt=cards.size();
//        for(int i=0;i<cnt-1;i++){
//            for(int j=i+1;j<cnt;j++){
//                edges.add(new Edge(cards.get(i).getCardId(),cards.get(j).getCardId()
//                        ,Math.sqrt(
//                                Math.pow(cards.get(i).getX()-cards.get(j).getX(),2)
//                        +Math.pow(cards.get(i).getY()-cards.get(j).getY(),2)
//                        +Math.pow(cards.get(i).getZ()-cards.get(j).getZ(),2)
//                ));
//            }
//        }
//
//        return list;
//    }
}
